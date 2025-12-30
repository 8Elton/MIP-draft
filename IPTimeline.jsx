import React from "react";
import malwareIntel from "../utils/malwareIntel";
import "../App.css";
import "./IPTimeline.css"// make sure your styles are loaded

const IPTimeline = ({ events }) => {
  if (!events || events.length === 0) {
    return <p>No intelligence found for this IP yet.</p>;
  }

  // Helper function to parse DD/MM/YYYY HH:MM format
  const parseTimestamp = (ts) => {
    if (!ts) return "Unknown timestamp";
    // Split string into parts
    const parts = ts.split(/[/ :]/); // ["24","12","2025","11","53"]
    if (parts.length < 5) return ts; // fallback if format unexpected
    const dateObj = new Date(
      parts[2],      // year
      parts[1] - 1,  // month (0-based)
      parts[0],      // day
      parts[3],      // hour
      parts[4]       // minute
    );
    return dateObj.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ul className="timeline">
      {events.map((event, index) => {
        // Get malware intelligence for this event
        const intel =
          malwareIntel[event.malware?.toLowerCase()] || malwareIntel.unknown;

        return (
          <li key={index} className="timeline-item">
            <div className="timeline-content">
              <p>
                <strong>Timestamp:</strong> {parseTimestamp(event.timestamp)}
              </p>

              <p>
                <strong>Malware:</strong>{" "}
                <span className="malware">{event.malware}</span>
              </p>

              {/* Malware description and recommendation */}
              <div className="intel-box">
                <p className="intel-desc">
                  <strong>About this malware:</strong><br />
                  {intel.description}
                </p>

                <p className="intel-rec">
                  <strong>Recommended Action:</strong><br />
                  {intel.recommendation}
                </p>
              </div>

              <p>
                <strong>Protocol:</strong> {event.proto}
              </p>

              <p>
                <strong>Source Port:</strong> {event.src_port} |{" "}
                <strong>Destination IP:</strong> {event.dst_ip} |{" "}
                <strong>Destination Port:</strong> {event.dst_port}
              </p>

              {event.dst_host && (
                <p>
                  <strong>Destination Host:</strong> {event.dst_host}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IPTimeline;
