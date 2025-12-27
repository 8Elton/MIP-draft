import React, { useState } from "react";
import "./IPSearch.css";

export default function IPSearch({ onResults }) {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchIP = async (e) => {
    e.preventDefault();
    if (!ip) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/ipintel/search/${ip.trim()}`);
      const data = await res.json();

      if (data.message) onResults([]);
      else onResults(Array.isArray(data) ? data : [data]);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={searchIP}>
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Search IP (e.g. 8.8.8.8)"
        />
        <button type="submit">Search</button>
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "#C71852" }}>{error}</p>}
      </form>
    </div>
  );
}
