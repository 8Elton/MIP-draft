import React, { useState } from "react";

export default function AdminDashboard({ token }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Success! ${data.count} records ingested`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div className="admin-dashboard" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br/>
        <button type="submit">Upload CSV</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
