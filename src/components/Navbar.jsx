import { useNavigate, useLocation } from "react-router-dom"
import { supabase } from "../supabase"

export default function Navbar({ session }) {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/calendario", label: "Calendario" },
    { path: "/perfil", label: "Perfil" },
    { path: "/planes", label: "Planes" },
  ]

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-sm">💰</span>
        </div>
        <span className="text-white font-black text-lg">FinTrack</span>
      </div>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`text-sm font-medium transition ${
              location.pathname === link.path
                ? "text-yellow-500"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-zinc-500 hover:text-red-400 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}