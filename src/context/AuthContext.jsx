import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'

// ============================================================================
// Contexto de autenticación — Semana 1, Sesión 1
// ----------------------------------------------------------------------------
// AHORA MISMO es una implementación MOCK: cualquier email/contraseña "inicia
// sesión" y el usuario se guarda solo en memoria.
//
//   👉 SESIÓN 1 (Supabase desde cero): sustituir las funciones mock por las
//      reales de Supabase Auth:
//        - supabase.auth.signInWithPassword({ email, password })
//        - supabase.auth.signUp({ email, password })
//        - supabase.auth.signOut()
//        - supabase.auth.onAuthStateChange(...) para escuchar la sesión
// ============================================================================

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSupabaseConfigured) {
      // TODO (Sesión 1): recuperar la sesión actual y suscribirse a los cambios.
      // const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      //   setUser(session?.user ?? null)
      // })
      // return () => data.subscription.unsubscribe()
    }
    setLoading(false)
  }, [])

  async function signIn(email /*, password */) {
    // TODO (Sesión 1): reemplazar por supabase.auth.signInWithPassword(...)
    const mockUser = { id: 'demo', email }
    setUser(mockUser)
    return { user: mockUser, error: null }
  }

  async function signUp(email /*, password */) {
    // TODO (Sesión 1): reemplazar por supabase.auth.signUp(...)
    const mockUser = { id: 'demo', email }
    setUser(mockUser)
    return { user: mockUser, error: null }
  }

  async function signOut() {
    // TODO (Sesión 1): reemplazar por supabase.auth.signOut()
    setUser(null)
  }

  const value = { user, loading, signIn, signUp, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
