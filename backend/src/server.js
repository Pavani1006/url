import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import linkRoutes from "./routes/links.js";
import { redirectLink } from "./controllers/linkController.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
// app.get("/healthz", (req, res) => {
//   res.json({ ok: true });
// });
app.get("/healthz", (req, res) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    uptime: process.uptime(),       // time server is running
    timestamp: new Date().toISOString()
  });
});


// API routes ONLY here
app.use("/api/links", linkRoutes);

// Redirect route - must be last
app.get("/:code", redirectLink);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
