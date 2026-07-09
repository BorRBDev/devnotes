// Tarjeta que muestra una nota.
export default function NoteCard({ note, onDelete }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      {note.image_url && (
        <img
          src={note.image_url}
          alt={note.title}
          className="mb-3 h-40 w-full rounded object-cover"
        />
      )}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800">{note.title}</h3>
        <button
          onClick={() => onDelete(note.id)}
          className="text-sm text-red-500 hover:text-red-700"
          aria-label="Eliminar nota"
        >
          Eliminar
        </button>
      </div>
      <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">
        {note.content}
      </p>
      <time className="mt-2 block text-xs text-slate-400">
        {new Date(note.created_at).toLocaleString('es-ES')}
      </time>
    </article>
  )
}
