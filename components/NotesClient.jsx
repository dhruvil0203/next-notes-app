"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const NotesClient = ({ intialNotes }) => {
  const [notes, setNotes] = useState(intialNotes ?? []);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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
      if (result.success) {
        setTitle("");
        setContent("");
        setNotes([...notes, result.data]);
        toast.success("Note Created Successfully");
      }
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create note");
    }
  };

  const deletNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Notes deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting note: ", error);
      toast.error("Something went wrong.");
    }
  };

  const updateNode = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: editTitle, content: editContent })
        }
      )
      const result = await response.json();
      if (result.success) {
        setNotes(notes.map((note) => (note._id === id ? result.data : note)))
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
        toast.success("Note updated successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error updating note: ", error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  }

  const startEdiditng = (note) => {
    setEditingId(note._id);
    setEditTitle("");
    setEditContent("");
  }

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  }

  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-gray-800 font-bold mb-4 text-xl ">
          Create New Note
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Content"
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
      <div className="space-y-4 ">
        <h2>Your Notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">
            Not notes yet.Create Your First Note Above
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
              {editingId === note._id ? (
                <>
                  {/* Editing mode */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      placeholder="Note Title"
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500"
                      value={editContent}
                      placeholder="Note Content"
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                    ></textarea>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateNode(note._id)}
                        disabled={loading}
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => cancelEditing()}
                        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2 ">
                    <h3 className="text-gray-800 font-semibold text-lg">
                      {note.title}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdiditng(note)}
                        className="text-blue-500 hover:text-blue-700 text-sm">
                        Edit
                      </button>
                      <button
                        onClick={() => deletNote(note._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500">
                    Created:{new Date(note.createdAt).toLocaleDateString()}
                  </p>
                  {note.updatedAt !== note.createdAt && (
                    <p className="text-sm text-gray-500">
                      Updated:{new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
