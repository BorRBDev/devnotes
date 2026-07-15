import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm.jsx";
import NoteCard from "../components/NoteCard.jsx";
import {
  listNotes,
  createNote,
  deleteNote,
  getNotesStats,
} from "../lib/notes.js";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setNotes(await listNotes());
  }
  useEffect(() => {
    getNotesStats()
      .then((r) => console.log("stats:", r))
      .catch((e) => console.log("stats error:", e));
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  async function handleCreate(data) {
    await createNote(data);
    await refresh();
  }

  async function handleDelete(id) {
    await deleteNote(id);
    await refresh();
  }

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-brand-dark">Mis notas</h1>
      <NoteForm onCreate={handleCreate} />
      {loading ? (
        <p className="text-slate-500">Cargando notas…</p>
      ) : notes.length === 0 ? (
        <p className="text-slate-500">Aún no tienes notas. ¡Crea la primera!</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
