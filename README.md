# 📝 NoteFlow — Smart Notes App

A full-stack notes application built with **Next.js 15**, **MongoDB**, **Redis**, and **Tailwind CSS**. Create, read, update, and delete notes with a clean and responsive UI. Notes are cached with Redis for lightning-fast load times.

🌐 **Live Demo:** [noteflow.dhruvilmistry.in](https://noteflow.dhruvilmistry.in)

---

## ✨ Features

- ✅ Create notes with a title and content
- 📋 View all your saved notes
- ✏️ Edit notes inline
- 🗑️ Delete notes
- ⚡ Redis caching for faster reads (cache-aside pattern)
- 🔔 Toast notifications for all actions
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | React framework with App Router & SSR |
| [React 19](https://react.dev/) | UI library |
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [Redis (Upstash)](https://upstash.com/) | In-memory caching layer |
| [ioredis](https://github.com/redis/ioredis) | Redis client for Node.js |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS styling |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |

---

## 📁 Project Structure

```
nextjs-notes-app/
├── app/
│   ├── api/
│   │   └── notes/
│   │       ├── route.js          # GET (cached), POST /api/notes
│   │       └── [id]/
│   │           └── route.js      # PUT, DELETE /api/notes/:id
│   ├── layout.js
│   └── page.js
├── components/
│   └── NotesClient.jsx           # Client-side notes UI
├── lib/
│   ├── db.js                     # MongoDB connection
│   └── redis.js                  # Redis (ioredis) client
├── models/
│   └── notes.js                  # Mongoose Note schema
└── .env                          # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- Redis (local or [Upstash](https://upstash.com/) for production)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruvil0203/next-notes-app.git
   cd next-notes-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   ```

   > For production, use [Upstash Redis](https://upstash.com/) and add the `REDIS_URL` to your Vercel environment variables. The `REDIS_URL` must start with `rediss://` for Upstash (TLS required).

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Cache |
|---|---|---|---|
| `GET` | `/api/notes` | Fetch all notes | ✅ Cached (60s TTL) |
| `POST` | `/api/notes` | Create a new note | 🗑️ Invalidates cache |
| `PUT` | `/api/notes/:id` | Update a note by ID | 🗑️ Invalidates cache |
| `DELETE` | `/api/notes/:id` | Delete a note by ID | 🗑️ Invalidates cache |

### ⚡ Redis Caching Strategy

This app uses the **Cache-Aside** pattern:
- On `GET /api/notes`: Check Redis first → if cache hit, return instantly. If miss, query MongoDB → save result to Redis (60s TTL) → return.
- On `POST`, `PUT`, `DELETE`: After modifying MongoDB, delete the `notes` cache key so the next `GET` fetches fresh data.

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
