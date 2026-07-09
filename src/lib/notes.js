import { supabase, isSupabaseConfigured } from './supabaseClient.js'

// ============================================================================
// Capa de acceso a datos de las NOTAS
// ----------------------------------------------------------------------------
// De momento devuelve datos MOCK en memoria para que la interfaz funcione.
//
//   👉 SESIÓN 2 (Supabase a fondo): sustituir cada función mock por consultas
//      reales a la tabla `notes` con el cliente de Supabase, y subir las
//      imágenes a Supabase Storage.
//
// La estructura de cada nota es:
//   { id, user_id, title, content, image_url, created_at }
// ============================================================================

let mockNotes = [
  {
    id: 'mock-1',
    user_id: 'demo',
    title: 'Bienvenido a DevNotes',
    content:
      'Esta es una nota de ejemplo (modo mock). En la Sesión 2 conectaremos esto a Supabase.',
    image_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: 'mock-2',
    user_id: 'demo',
    title: 'Cómo funciona el proyecto',
    content:
      'Cada semana ampliamos la app: Supabase, Docker, GitHub Actions y AWS.',
    image_url: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
]

export async function listNotes() {
  if (isSupabaseConfigured) {
    // TODO (Sesión 2): const { data, error } = await supabase.from('notes')...
    // Recuerda: con RLS activo, Supabase ya filtra por el usuario autenticado.
  }
  return [...mockNotes].sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export async function createNote({ title, content, imageFile }) {
  if (isSupabaseConfigured) {
    // TODO (Sesión 2): subir imageFile a Storage e insertar la fila en `notes`.
  }
  const note = {
    id: 'mock-' + Date.now(),
    user_id: 'demo',
    title,
    content,
    image_url: imageFile ? URL.createObjectURL(imageFile) : null,
    created_at: new Date().toISOString(),
  }
  mockNotes = [note, ...mockNotes]
  return note
}

export async function deleteNote(id) {
  if (isSupabaseConfigured) {
    // TODO (Sesión 2): await supabase.from('notes').delete().eq('id', id)
  }
  mockNotes = mockNotes.filter((n) => n.id !== id)
  return true
}

// Exportado para tests / debug del modo mock.
export const __mock = { get: () => mockNotes }
