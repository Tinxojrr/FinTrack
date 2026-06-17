import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../supabase"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar({ session, perfil }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/calendario", label: "Calendario", icon: "📅" },
    { path: "/perfil", label: "Perfil", icon: "👤" },
    { path: "/planes", label: "Planes", icon: "⚡" },
  ]

  const planBadge = {
    free: "bg-zinc-800 text-zinc-400",
    pro: "bg-yellow-500/20 text-yellow-500",
    business: "bg-purple-500/20 text-purple-400"
  }

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <span className="text-sm">💰</span>
          </div>
          <span className="text-white font-black text-lg tracking-tight">FinTrack</span>
        </motion.div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <motion.button
              key={link.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                location.pathname === link.path
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* Derecha */}
        <div className="hidden md:flex items-center gap-3">
          {perfil && (
            <span className={`text-xs px-3 py-1 rounded-full font-bold ${planBadge[perfil.plan || "free"]}`}>
              {(perfil.plan || "free").toUpperCase()}
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-zinc-500 hover:text-red-400 transition px-3 py-2 rounded-xl hover:bg-red-500/10"
          >
            Salir
          </motion.button>
        </div>

        {/* Menú móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-zinc-400 hover:text-white transition"
        >
          {menuAbierto ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-zinc-900 px-6 py-4 space-y-1"
          >
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setMenuAbierto(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </button>
            ))}
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
            >
              Salir
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}