import dbConnection from "@/lib/db";
import NotesClient from "@/components/NotesClient";
import Note from "@/models/notes";

async function getNotes() {
  await dbConnection();
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt?.toISOString(),
    updatedAt: note.updatedAt?.toISOString(),
  }))
}

export default async function Home() {
  const notes = await getNotes();
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
        <NotesClient intialNotes={notes} />
      </main>
    </div>
  );
}
