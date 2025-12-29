import React from "react";
import "./IPTimeline.css";

const IPTimeline = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="timeline-empty">
        No timeline data available
      </div>
    );
  }

  return (
    <div className="timeline-container">
      <h3 className="timeline-title">IP Activity Timeline</h3>

      <ul className="timeline">
        {events.map((event, index) => (
          <li key={index} className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <p><strong>Timestamp:</strong> {event.timestamp}</p>
              <p><strong>ASN:</strong> {event.asn}</p>
              <p><strong>Malware:</strong> {event.malware}</p>
              <p><strong>Protocol:</strong> {event.proto}</p>
              <p>
                <strong>Connection:</strong>{" "}
                {event.ip}:{event.src_port} → {event.dst_ip}:{event.dst_port}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IPTimeline;
