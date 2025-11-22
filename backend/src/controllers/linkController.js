import {
  createLink,
  getAllLinks,
  getLinkByCode,
  deleteLink,
  updateClicks,
} from "../models/linkModel.js";
import { pool } from "../db.js";


export const createShortLink = async (req, res) => {
  try {
    let { url, code } = req.body;

// auto-generate code if empty
if (!code || code.trim() === "") {
  // code = Math.random().toString(36).substring(2, 8);
  // Generate professional auto code
code = `auto-${Date.now().toString().slice(-5)}`;

}


    const exists = await getLinkByCode(code);
    if (exists.rowCount > 0)
      return res.status(409).json({ error: "Code already exists" });

    const result = await createLink(code, url);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const listLinks = async (req, res) => {
  const result = await getAllLinks();
  res.json(result.rows);
};

export const getStats = async (req, res) => {
  const result = await getLinkByCode(req.params.code);
  if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
  res.json(result.rows[0]);
};

export const removeLink = async (req, res) => {
  await deleteLink(req.params.code);
  res.json({ success: true });
};

export const redirectLink = async (req, res) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      "SELECT url FROM links WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Not Found");
    }

    await pool.query(
      "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1",
      [code]
    );

    return res.redirect(result.rows[0].url);

  } catch (err) {
    res.status(500).send("Server Error");
  }
};

