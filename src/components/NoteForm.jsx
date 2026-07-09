import { useState } from 'react'

// Formulario para crear una nota (título, contenido e imagen opcional).
export default function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    await onCreate({ title: title.trim(), content: content.trim(), imageFile })
    setTitle('')
    setContent('')
    setImageFile(null)
    e.target.reset()
    setSaving(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la nota"
        className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe algo…"
        rows={3}
        className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        className="block text-sm text-slate-500"
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
      >
        {saving ? 'Guardando…' : 'Añadir nota'}
      </button>
    </form>
  )
}
