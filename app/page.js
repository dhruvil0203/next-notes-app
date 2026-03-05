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
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <NotesClient intialNotes={notes} />
    </div>
  );
}
