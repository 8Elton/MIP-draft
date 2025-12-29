const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const IPIntel = require("../models/IPIntel");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* =========================
   ADMIN LOGIN
========================= */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

/* =========================
   CSV UPLOAD (PROTECTED)
========================= */
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  adminAuth,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          asn: row.asn,
          ip: row.ip,
          timestamp: new Date(row.timestamp),
          malware: row.malware,
          src_port: row.src_port,
          dst_ip: row.dst_ip,
          dst_port: row.dst_port,
          dst_host: row.dst_host,
          proto: row.proto,
        });
      })
      .on("end", async () => {
        try {
          await IPIntel.insertMany(results);
          fs.unlinkSync(req.file.path);
          res.json({ message: "CSV ingested successfully", count: results.length });
        } catch (err) {
          res.status(500).json({ error: "Database insert failed" });
        }
      });
  }
);

module.exports = router;
