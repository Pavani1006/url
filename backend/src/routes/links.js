import express from "express";
import {
  createShortLink,
  listLinks,
  getStats,
  removeLink,
} from "../controllers/linkController.js";

const router = express.Router();

// Do NOT add "/api/links" here
router.post("/", createShortLink);
router.get("/", listLinks);
router.get("/:code", getStats);
router.delete("/:code", removeLink);

export default router;
