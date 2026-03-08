"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTheme } from "@/app/context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";


const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--input-bg)",
  color: "var(--foreground)",
  fontSize: "0.92rem",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "var(--muted)",
  marginBottom: "6px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const cardStyle = {
  background: "var(--card-bg)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "24px",
};

const primaryBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 22px",
  borderRadius: "10px",
  border: "none",
  background: "var(--accent)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.88rem",
  cursor: "pointer",
  letterSpacing: "0.02em",
  transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
  boxShadow: "0 2px 10px var(--accent-muted)",
};

const ghostBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--muted)",
  fontWeight: 500,
  fontSize: "0.85rem",
  cursor: "pointer",
  transition: "all 0.2s ease",
};


const onFocus = (e) => {
  e.target.style.borderColor = "var(--accent)";
  e.target.style.boxShadow = "0 0 0 3px var(--accent-muted)";
};
const onBlur = (e) => {
  e.target.style.borderColor = "var(--border)";
  e.target.style.boxShadow = "none";
};


const NotesClient = ({ intialNotes }) => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create note");
    }
  };

  const deletNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
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
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      const result = await response.json();
      if (result.success) {
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
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
  };

  const startEdiditng = (note) => {
    setEditingId(note._id);
    setEditTitle("");
    setEditContent("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--foreground)" }}>
          Notes App
        </h1>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "var(--btn-secondary-bg)",
            color: "var(--foreground)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--accent-muted)";
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "var(--btn-secondary-bg)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--foreground)";
          }}
        >
          {isDark ? <BsSun size={16} /> : <BsMoon size={16} />}
        </button>
      </div>


      <form onSubmit={createNote} style={cardStyle}>
        <h2 style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--foreground)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--accent)", display: "inline-block",
          }} />
          Create New Note
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title..."
              required
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label style={labelStyle}>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              style={primaryBtnStyle}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--accent-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 16px var(--accent-muted)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px var(--accent-muted)";
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                  Creating...
                </>
              ) : (
                <>＋ Create Note</>
              )}
            </button>
          </div>
        </div>
      </form>


      <div>
        <h3 style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "var(--muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}>
          Your Notes ({notes.length})
        </h3>

        {notes.length === 0 ? (
          <div style={{
            ...cardStyle,
            textAlign: "center",
            padding: "40px 24px",
            color: "var(--muted)",
            fontSize: "0.9rem",
          }}>
            No notes yet. Create your first note above ↑
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {notes.map((note) => (
              <div key={note._id} style={cardStyle}>
                {editingId === note._id ? (

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={labelStyle}>Title</label>
                      <input
                        type="text"
                        value={editTitle}
                        placeholder="Note title..."
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Content</label>
                      <textarea
                        value={editContent}
                        placeholder="Note content..."
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => updateNode(note._id)}
                        disabled={loading}
                        style={{ ...primaryBtnStyle, background: "#16a34a", boxShadow: "0 2px 10px rgba(22,163,74,0.2)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#15803d"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.transform = "translateY(0)"; }}
                      >
                        {loading ? "Saving..." : "✓ Save"}
                      </button>
                      <button
                        onClick={cancelEditing}
                        style={ghostBtnStyle}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.borderColor = "var(--foreground)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (

                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>
                        {note.title}
                      </h3>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => startEdiditng(note)}
                          style={{
                            padding: "4px 12px", borderRadius: "6px",
                            border: "1px solid var(--border)",
                            background: "transparent",
                            color: "var(--accent)", fontWeight: 600,
                            fontSize: "0.78rem", cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-muted)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletNote(note._id)}
                          style={{
                            padding: "4px 12px", borderRadius: "6px",
                            border: "1px solid transparent",
                            background: "transparent",
                            color: "#f87171", fontWeight: 600,
                            fontSize: "0.78rem", cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.1)"; e.currentTarget.style.borderColor = "#f87171"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "12px" }}>
                      {note.content}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", opacity: 0.7 }}>
                      {new Date(note.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {note.updatedAt !== note.createdAt && (
                        <span> · Updated {new Date(note.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                      )}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>


      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default NotesClient;
