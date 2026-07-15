import { supabase, isSupabaseConfigured } from './supabaseClient.js'


export async function listNotes() {
 const { data, error} = await supabase
  .from('notes')
  .select('*')
  .order('created_at', {ascending: false})
  if (error) throw error
  return data
}

export async function createNote({ title, content, imageFile }) {
let image_url = null

if (imageFile) {
  const {data: {user}} = await supabase.auth.getUser()
  const path = `${user.id}/${Date.now()} - ${imageFile.name}`

  const {error: uploadError} = await supabase.storage
  .from('note-images')
  .upload(path, imageFile)
  if(uploadError) throw uploadError

  const {data} = supabase.storage.from('note-images').getPublicUrl(path)
  image_url = data.publicUrl

}


 const {data, error} = await supabase
  .from('notes')
  .insert({title, content, image_url})
  .select()
  .single()
  if (error) throw error
  return data
}

export async function deleteNote(id) {
 const {error} = await supabase
  .from('notes')
  .delete()
  .eq('id', id)
if (error)  throw error
return true   
}

export async function getNotesStats() {
  const {data, error} = await supabase
    .functions.invoke('notes-stats')
    if (error) throw error
    return data
}

// Exportado para tests / debug del modo mock.
export const __mock = { get: () => mockNotes }
