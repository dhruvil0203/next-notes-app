import dbConnection from "@/lib/db";
import NotesClient from "@/components/NotesClient";
import Note from "@/models/notes";
import redis from "@/lib/redis";

export const dynamic = 'force-dynamic';

async function getNotes() {
  // Try Redis cache first
  try {
    if (redis) {
      const cachedNotes = await redis.get("notes");
      if (cachedNotes) {
        const parsed = JSON.parse(cachedNotes);
        return parsed.map((note) => ({
          ...note,
          _id: note._id?.toString() || note._id,
        }));
      }
    }
  } catch (redisError) {
    console.error("Redis GET error (page):", redisError.message);
  }

  // Cache miss — fetch from MongoDB
  await dbConnection();
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  const serialized = notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt?.toISOString(),
    updatedAt: note.updatedAt?.toISOString(),
  }));

  // Store in Redis for next request (60s TTL)
  try {
    if (redis) await redis.set("notes", JSON.stringify(serialized), "EX", 60);
  } catch (redisError) {
    console.error("Redis SET error (page):", redisError.message);
  }

  return serialized;
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
