import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="bg-brand-dark text-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          📝 DevNotes
        </Link>
        {user ? (
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden opacity-80 sm:inline">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded bg-white/10 px-3 py-1 hover:bg-white/20"
            >
              Salir
            </button>
          </div>
        ) : (
          <nav className="flex gap-3 text-sm">
            <Link to="/login" className="hover:underline">
              Entrar
            </Link>
            <Link to="/register" className="hover:underline">
              Crear cuenta
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
