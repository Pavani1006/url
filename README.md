# 🔗 TinyLink – URL Shortener

A simple and efficient URL shortening service that allows users to generate shortened links,
track total clicks, and view usage statistics in real time.  
This app is built using **Node.js, Express, PostgreSQL, React, and deployed with Render + Netlify**.

---

## 🚀 Live Demo

| Service | URL |
|--------|-----|
| 🌐 Frontend | https://limit-url.netlify.app/ |
| 🔌 Backend API | https://url-uwry.onrender.com |
| 🗄 Database | Neon Tech – PostgreSQL |

---

## ✅ Features

✔ Shorten any valid URL  
✔ Provide **custom short code** (optional)  
✔ Auto-generate short code if not provided  
✔ Click tracking  
✔ Detailed Stats page:  
 • Click count  
 • Creation timestamp  
 • Last clicked timestamp  
✔ Delete short links  
✔ Responsive UI (Tailwind CSS)

---

## 🧠 System Architecture

Frontend (React + Netlify)
|
v
Backend API (Node.js + Express + Render)
|
v
Database (PostgreSQL on Neon)


---

## 📌 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/links` | Create short link |
| GET | `/api/links` | Get all links |
| GET | `/api/links/:code` | Get specific link stats |
| DELETE | `/api/links/:code` | Delete link |
| GET | `/:code` | Redirect to original URL |

---

## 🗄 Database Schema (PostgreSQL)

```sql
CREATE TABLE links (
  code VARCHAR(10) PRIMARY KEY,
  url TEXT NOT NULL,
  clicks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_clicked TIMESTAMP
);
