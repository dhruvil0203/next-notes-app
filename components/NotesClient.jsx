"use client";
import React, { useState, useEffect } from "react";

const NotesClient = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      console.log(result);
      setLoading(false);
    } catch (error) {}
  };
  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-gray-800 font-bold mb-4 text-xl ">
          Create New Note
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name=""
            required
            id=""
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name=""
            id=""
            placeholder="Note Content"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesClient;
