import { supabase } from './supabaseClient.js'

/**
 * Pide a la Edge Function una URL prefirmada y sube la imagen DIRECTO a S3.
 * Las claves de AWS nunca llegan al navegador: viven como secretos en la función.
 */
async function subirImagenAS3(imageFile) {

  const { data, error } = await supabase.functions.invoke('s3-upload-url', {
    body: { filename: imageFile.name, contentType: imageFile.type },
  })
  if (error) throw error


  const res = await fetch(data.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': imageFile.type },
    body: imageFile,
  })
  if (!res.ok) throw new Error('No se pudo subir la imagen a S3')


  return `${import.meta.env.VITE_CLOUDFRONT_URL}/${data.key}`
}

export async function listNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createNote({ title, content, imageFile }) {
  let image_url = null

  if (imageFile) {
    image_url = await subirImagenAS3(imageFile)
  }

  const { data, error } = await supabase
    .from('notes')
    .insert({ title, content, image_url })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteNote(id) {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw error
  return true
}

export async function getNotesStats() {
  const { data, error } = await supabase.functions.invoke('notes-stats')
  if (error) throw error
  return data
}
