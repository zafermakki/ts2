import EventForm from "./components/EventForm";
import EventPreview from "./components/EventPreview";
import useEventForm from "./hooks/useEventForm";
import "./App.css";

function App() {
  const {
    register,
    formData,
    errors,
    successMessage,
    submittedEvent,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  } = useEventForm();

  return (
    <main className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            E
          </span>
          <span className="brand-name">Evently</span>
        </div>

        <div className="header-label">
          <span className="header-status-dot" />
          Event Management
        </div>
      </header>

      <section className="page-intro">
        <span className="page-eyebrow">CREATE SOMETHING GREAT</span>

        <h1>
          Bring your event
          <br />
          <span>to life.</span>
        </h1>

        <p>
          Fill in your event details, customize the essentials, and
          preview your event before creating it.
        </p>
      </section>

      <section className="event-layout">
        <EventForm
          register={register}
          formData={formData}
          errors={errors}
          onFieldChange={handleChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onReset={resetForm}
          successMessage={successMessage}
          submittedEvent={submittedEvent}
        />

        <EventPreview formData={formData} />
      </section>

      <footer className="app-footer">
        <span>Evently</span>
        <span>Event creation made simple.</span>
      </footer>
    </main>
  );
}

export default App;
