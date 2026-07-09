import { createClient } from '@supabase/supabase-js'

// ============================================================================
// Cliente de Supabase — Semana 1, Sesión 1
// ----------------------------------------------------------------------------
// El cliente ya está inicializado a partir de las variables de entorno.
// Copia .env.example a .env y rellena VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
// con los datos de TU proyecto de Supabase.
//
// Mientras no haya .env configurado, la app funciona en "modo mock" (datos de
// ejemplo en memoria) para que puedas ver la interfaz desde el minuto uno.
// ============================================================================

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Flag que usa la app para saber si trabajar contra Supabase o contra los mocks.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[DevNotes] Supabase no está configurado todavía. La app usa datos mock. ' +
      'Configura tu .env en la Sesión 1.'
  )
}
