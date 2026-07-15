import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient.js";

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

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data?.user ?? null, error };
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { user: data?.user ?? null, error };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  const value = { user, loading, signIn, signUp, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
