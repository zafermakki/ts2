
const FormField = ({
  label,
  name,
  register,
  onFieldChange,
  type = "text",
  placeholder = "",
  error = "",
  required = false,
  options = [],
  rows = 4,
  hint = "",
}) => {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  const registration = register(name);

  const handleChange = (event) => {
    registration.onChange(event);
    onFieldChange?.(name, event.target.value);
  };

  const commonProps = {
    ...registration,
    id: name,
    name,
    onChange: handleChange,
    "aria-invalid": Boolean(error),
    "aria-describedby":
      [error ? errorId : "", hint ? hintId : ""]
        .filter(Boolean)
        .join(" ") || undefined,
    "aria-required": required,
    className: `form-input ${error ? "input-error" : ""}`,
  };

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          {...commonProps}
          placeholder={placeholder}
          rows={rows}
        />
      ) : type === "select" ? (
        <select {...commonProps}>
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...commonProps}
          type={type}
          placeholder={placeholder}
        />
      )}

      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
