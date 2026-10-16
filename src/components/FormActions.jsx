const FormActions = ({ onReset }) => {
  return (
    <div className="form-actions">
      <button
        type="button"
        className="button button-secondary"
        onClick={onReset}
      >
        Reset Form
      </button>

      <button type="submit" className="button button-primary">
        Create Event
        <span aria-hidden="true"> →</span>
      </button>
    </div>
  );
};

export default FormActions;