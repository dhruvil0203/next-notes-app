# 📝 NoteFlow — Smart Notes App

A full-stack notes application built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**. Create, read, update, and delete notes with a clean and responsive UI.

🌐 **Live Demo:** [noteflow.dhruvilmistry.in](https://noteflow.dhruvilmistry.in)

---

## ✨ Features

- ✅ Create notes with a title and content
- 📋 View all your saved notes
- ✏️ Edit notes inline
- 🗑️ Delete notes
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
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS styling |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |

---

## 📁 Project Structure

```
nextjs-notes-app/
├── app/
│   ├── api/
│   │   └── notes/
│   │       ├── route.js          # GET, POST /api/notes
│   │       └── [id]/
│   │           └── route.js      # PUT, DELETE /api/notes/:id
│   ├── layout.js
│   └── page.js
├── components/
│   └── NotesClient.jsx           # Client-side notes UI
├── lib/
│   └── db.js                     # MongoDB connection
├── models/
│   └── notes.js                  # Mongoose Note schema
└── .env                          # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)

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

   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/notes` | Fetch all notes |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id` | Update a note by ID |
| `DELETE` | `/api/notes/:id` | Delete a note by ID |

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
