import { describe, it, expect } from 'vitest'
import { listNotes, createNote, deleteNote } from '../lib/notes.js'

// ============================================================================
// Test de ejemplo (modo mock) — sirve de base para la Sesión 4 (GitHub Actions).
// En esa sesión ampliaremos la batería de tests que actúa como "quality gate".
// ============================================================================
describe('notes (mock)', () => {
  it('crea una nota y la incluye en el listado', async () => {
    const created = await createNote({
      title: 'Nota de test',
      content: 'contenido',
      imageFile: null,
    })
    const notes = await listNotes()
    expect(notes.some((n) => n.id === created.id)).toBe(true)
    await deleteNote(created.id)
  })

  it('elimina una nota', async () => {
    const created = await createNote({ title: 'Temporal', content: '', imageFile: null })
    await deleteNote(created.id)
    const notes = await listNotes()
    expect(notes.some((n) => n.id === created.id)).toBe(false)
  })
})
