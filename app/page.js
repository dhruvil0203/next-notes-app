import dbConnection from "@/lib/db";
import NotesClient from "@/components/NotesClient";

export default async function Home() {
  await dbConnection();
  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <NotesClient />
    </div>
  );
}
