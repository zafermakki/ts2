
import { useEffect, useState } from "react";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventSchema from "../utils/validateEvent";

const DATABASE_NAME = "eventManagementDB";
const STORE_NAME = "drafts";
const DRAFT_KEY = "currentEventDraft";

const createInitialFormData = () => ({
  eventName: "",
  description: "",
  date: "",
  category: "",
  eventType: "online",
  meetingUrl: "",
  location: "",
  coverImage: "",
  coverImageName: "",
});

// Open IndexedDB.
const openDraftDatabase = () => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported by this browser."));
      return;
    }

    const request = window.indexedDB.open(DATABASE_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);

    request.onerror = () => {
      reject(request.error || new Error("Unable to open the draft database."));
    };
  });
};

// Execute an IndexedDB operation.
const runDraftTransaction = async (mode, operation) => {
  const database = await openDraftDatabase();

  return new Promise((resolve, reject) => {
    let result = null;
    let request;

    try {
      const transaction = database.transaction(STORE_NAME, mode);
      request = operation(transaction.objectStore(STORE_NAME));

      if (request) {
        request.onsuccess = () => {
          result = request.result ?? null;
        };
      }

      transaction.oncomplete = () => {
        database.close();
        resolve(result);
      };

      transaction.onerror = () => {
        const error =
          transaction.error || new Error("Draft operation failed.");

        database.close();
        reject(error);
      };

      transaction.onabort = () => {
        const error =
          transaction.error || new Error("Draft operation was aborted.");

        database.close();
        reject(error);
      };
    } catch (error) {
      database.close();
      reject(error);
    }
  });
};

const saveDraft = (draft) =>
  runDraftTransaction("readwrite", (store) =>
    store.put(draft, DRAFT_KEY),
  );

const loadDraft = () =>
  runDraftTransaction("readonly", (store) =>
    store.get(DRAFT_KEY),
  );

const clearDraft = () =>
  runDraftTransaction("readwrite", (store) =>
    store.delete(DRAFT_KEY),
  );

const hasDraftContent = (data) =>
  Boolean(
    data.eventName.trim() ||
      data.description.trim() ||
      data.date ||
      data.category ||
      data.eventType !== "online" ||
      data.meetingUrl.trim() ||
      data.location.trim() ||
      data.coverImage,
  );

const useEventForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [submittedEvent, setSubmittedEvent] = useState(null);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  const {
    register,
    control,
    handleSubmit: handleFormSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: createInitialFormData(),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  // Subscribe to the form values for preview and autosave.
  const formData =
    useWatch({ control }) || createInitialFormData();

  // Restore the saved draft when the app opens.
  useEffect(() => {
    let cancelled = false;

    const restoreDraft = async () => {
      try {
        const savedDraft = await loadDraft();

        if (
          !cancelled &&
          savedDraft &&
          savedDraft.formData
        ) {
          reset({
            ...createInitialFormData(),
            ...savedDraft.formData,
          });
        }
      } catch (error) {
        console.error("Unable to restore event draft:", error);
      } finally {
        if (!cancelled) {
          setIsDraftLoaded(true);
        }
      }
    };

    restoreDraft();

    return () => {
      cancelled = true;
    };
  }, [reset]);

  // Automatically save changes after a short delay.
  useEffect(() => {
    if (!isDraftLoaded) {
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        if (submittedEvent || !hasDraftContent(formData)) {
          await clearDraft();
          return;
        }

        await saveDraft({
          formData,
          savedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Unable to save event draft:", error);
      }
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [formData, isDraftLoaded, submittedEvent]);

  // Clear the success message when the user edits a field.
  const handleChange = () => {
    setSuccessMessage("");
    setSubmittedEvent(null);
  };

  // Handle the selected cover image.
  const handleImageChange = (file) => {
    setSuccessMessage("");
    setSubmittedEvent(null);

    if (!file) {
      setValue("coverImage", "", {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("coverImageName", "", {
        shouldDirty: true,
      });

      clearErrors("coverImage");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setValue("coverImage", "", {
        shouldDirty: true,
      });

      setValue("coverImageName", "", {
        shouldDirty: true,
      });

      setError("coverImage", {
        type: "manual",
        message: "Please upload a PNG, JPG or WEBP image.",
      });

      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      setValue("coverImage", "", {
        shouldDirty: true,
      });

      setValue("coverImageName", "", {
        shouldDirty: true,
      });

      setError("coverImage", {
        type: "manual",
        message: "The image size must not exceed 5 MB.",
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setError("coverImage", {
          type: "manual",
          message: "Unable to read this image. Please try another one.",
        });

        return;
      }

      setValue("coverImage", reader.result, {
        shouldDirty: true,
        shouldValidate: true,
      });

      setValue("coverImageName", file.name, {
        shouldDirty: true,
      });

      clearErrors("coverImage");
    };

    reader.onerror = () => {
      setError("coverImage", {
        type: "manual",
        message: "Unable to read this image. Please try again.",
      });
    };

    reader.readAsDataURL(file);
  };

  // React Hook Form validates the data through Zod before this runs.
  const handleSubmit = handleFormSubmit(async (data) => {
    const eventToSubmit = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    setSubmittedEvent(eventToSubmit);
    setSuccessMessage("Event created successfully!");

    try {
      await clearDraft();
    } catch (error) {
      console.error("Unable to clear submitted draft:", error);
    }
  });

  // Reset form fields, errors, success message and saved draft.
  const resetForm = () => {
    reset(createInitialFormData());
    clearErrors();
    setSuccessMessage("");
    setSubmittedEvent(null);

    clearDraft().catch((error) => {
      console.error("Unable to clear event draft:", error);
    });
  };

  return {
    register,
    formData,
    errors,
    successMessage,
    submittedEvent,
    isSubmitting,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  };
};

export default useEventForm;
