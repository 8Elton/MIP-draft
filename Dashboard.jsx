import React, { useState } from "react";
import IPSearch from "../components/IPSearch";
import IPTimeline from "../components/IPTimeline";
import "./Dashboard.css";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="logo">IP-INTEL</div>
        <nav className="nav">
          <span>Search</span>
          <span>Analytics</span>
          <span>About</span>
        </nav>
      </header>

      <main className="main-content">
        <IPSearch onResults={setEvents} />
        <IPTimeline events={events} />
      </main>
    </div>
  );
}
