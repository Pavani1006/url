import { pool } from "../db.js";

export const createLink = async (code, url) => {
  return await pool.query(
    `INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *`,
    [code, url]
  );
};

export const getAllLinks = async () => {
  return await pool.query(`SELECT * FROM links ORDER BY created_at DESC`);
};

export const getLinkByCode = async (code) => {
  return await pool.query(`SELECT * FROM links WHERE code = $1`, [code]);
};

export const deleteLink = async (code) => {
  return await pool.query(`DELETE FROM links WHERE code=$1`, [code]);
};

export const updateClicks = async (code) => {
  return await pool.query(
    `UPDATE links 
     SET clicks = clicks + 1, last_clicked = NOW() 
     WHERE code=$1 RETURNING *`,
    [code]
  );
};
