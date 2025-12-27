import React from "react";

export default function IPTimeline({ events }) {
  if (!events || events.length === 0) {
    return <p>No intelligence found for this IP</p>;
  }

  return (
    <div>
      <h3>IP Activity Timeline</h3>
      {events.map((e, i) => (
        <div key={i} style={{ borderLeft: "4px solid #C71852", paddingLeft: 12, marginBottom: 20 }}>
          <p><b>IP:</b> {e.ip}</p>
          <p><b>ASN:</b> {e.asn}</p>
          <p><b>Malware:</b> <span style={{ color: "#C71852" }}>{e.malware}</span></p>
          <p><b>Protocol:</b> {e.proto}</p>
          <p><b>Dst:</b> {e.dst_ip}:{e.dst_port}</p>
          <p><b>Time:</b> {new Date(e.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
