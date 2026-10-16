
import { z } from "zod";

const eventSchema = z
  .object({
    eventName: z
      .string()
      .trim()
      .min(1, "Event name is required."),

    description: z
      .string()
      .trim()
      .min(1, "Description is required."),

    date: z
      .string()
      .min(1, "Event date is required."),

    category: z
      .string()
      .min(1, "Please select an event category."),

    eventType: z.enum(["online", "in-person"], {
      message: "Please select an event type.",
    }),

    meetingUrl: z.string(),

    location: z.string(),

    coverImage: z.string(),

    coverImageName: z.string(),
  })
  .superRefine((data, context) => {
    // Online event validation
    if (data.eventType === "online") {
      const meetingUrl = data.meetingUrl.trim();

      if (!meetingUrl) {
        context.addIssue({
          code: "custom",
          path: ["meetingUrl"],
          message: "Meeting URL is required.",
        });
      } else {
        try {
          const url = new URL(meetingUrl);

          if (!["http:", "https:"].includes(url.protocol)) {
            context.addIssue({
              code: "custom",
              path: ["meetingUrl"],
              message: "Meeting URL must use HTTP or HTTPS.",
            });
          }
        } catch {
          context.addIssue({
            code: "custom",
            path: ["meetingUrl"],
            message: "Please enter a valid meeting URL.",
          });
        }
      }
    }

    // In-person event validation
    if (
      data.eventType === "in-person" &&
      !data.location.trim()
    ) {
      context.addIssue({
        code: "custom",
        path: ["location"],
        message: "Event location is required.",
      });
    }

    // Cover image validation
    if (!data.coverImage) {
      context.addIssue({
        code: "custom",
        path: ["coverImage"],
        message: "Please upload an event cover image.",
      });
    }
  });

export default eventSchema;
