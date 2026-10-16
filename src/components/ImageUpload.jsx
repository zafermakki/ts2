import { useRef } from "react";

const ImageUpload = ({
  image,
  imageName,
  error,
  onImageChange,
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onImageChange(null);
  };

  return (
    <div className="form-field">
      <label className="form-label" htmlFor="coverImage">
        Cover Image <span className="required-mark">*</span>
      </label>

      <div className={`image-upload ${error ? "upload-error" : ""}`}>
        {image ? (
          <div className="image-preview">
            <img src={image} alt="Selected event cover" />

            <div className="image-preview-footer">
              <div className="image-file-info">
                <span className="image-file-name">
                  {imageName || "Event cover image"}
                </span>
                <span className="image-file-status">
                  Image uploaded successfully
                </span>
              </div>

              <button
                type="button"
                className="remove-image-button"
                onClick={handleRemoveImage}
                aria-label="Remove cover image"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="upload-placeholder"
            onClick={() => inputRef.current?.click()}
          >
            <span className="upload-icon" aria-hidden="true">
              ↑
            </span>

            <span className="upload-title">
              Click to upload a cover image
            </span>

            <span className="upload-description">
              PNG, JPG or WEBP · Maximum 5 MB
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          id="coverImage"
          name="coverImage"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="visually-hidden"
          onChange={handleFileChange}
          aria-describedby={error ? "coverImage-error" : undefined}
        />
      </div>

      {error && (
        <p id="coverImage-error" className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;