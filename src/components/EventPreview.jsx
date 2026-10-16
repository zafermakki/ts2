import "../styles/EventPreview.css";

const formatDate = (date) => {
  if (!date) {
    return "Date to be announced";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const formatCategory = (category) => {
  if (!category) {
    return "Event Category";
  }

  const labels = {
    conference: "Conference",
    workshop: "Workshop",
    meetup: "Meetup",
    webinar: "Webinar",
    networking: "Networking",
    other: "Other",
  };

  return (
    labels[category] ||
    category.charAt(0).toUpperCase() + category.slice(1)
  );
};

const EventPreview = ({ formData }) => {
  const isOnline = formData.eventType === "online";

  const eventName = formData.eventName.trim() || "Your Event Name";

  const description =
    formData.description.trim() ||
    "Your event description will appear here. Tell your audience what makes this event special.";

  return (
    <aside className="event-preview-card">
      <div className="preview-heading">
        <div>
          <span className="section-eyebrow">LIVE PREVIEW</span>
          <h2>Event Preview</h2>
        </div>

        <span className="live-indicator">
          <span className="live-dot" />
          Live
        </span>
      </div>

      <div className="event-preview-content">
        <div className="preview-cover">
          {formData.coverImage ? (
            <img
              src={formData.coverImage}
              alt={formData.eventName || "Event cover"}
            />
          ) : (
            <div className="cover-placeholder">
              <span className="placeholder-symbol" aria-hidden="true">
                ✦
              </span>
              <span>Your cover image will appear here</span>
            </div>
          )}

          <span className="preview-category">
            {formatCategory(formData.category)}
          </span>
        </div>

        <div className="preview-event-details">
          <h3>{eventName}</h3>

          <p className="preview-description">{description}</p>

          <div className="preview-divider" />

          <div className="preview-info-row">
            <span className="preview-info-icon" aria-hidden="true">
              ▦
            </span>

            <div>
              <span className="preview-info-label">Date</span>
              <p>{formatDate(formData.date)}</p>
            </div>
          </div>

          <div className="preview-info-row">
            <span className="preview-info-icon" aria-hidden="true">
              ◉
            </span>

            <div>
              <span className="preview-info-label">Event Type</span>
              <p>{isOnline ? "Online Event" : "In-Person Event"}</p>
            </div>
          </div>

          {isOnline && formData.meetingUrl.trim() && (
            <div className="preview-info-row">
              <span className="preview-info-icon" aria-hidden="true">
                ↗
              </span>

              <div className="preview-link-container">
                <span className="preview-info-label">Meeting URL</span>
                <a
                  href={formData.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="preview-meeting-link"
                >
                  Join online
                </a>
              </div>
            </div>
          )}

          {!isOnline && (
            <div className="preview-info-row">
              <span className="preview-info-icon" aria-hidden="true">
                ⌖
              </span>

              <div>
                <span className="preview-info-label">Location</span>
                <p>{formData.location.trim() || "Location to be announced"}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="preview-footer">
        This is a live preview. Changes appear here automatically.
      </p>
    </aside>
  );
};

export default EventPreview;