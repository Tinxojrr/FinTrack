import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"

export default function Perfil({ session, perfil }) {
  const [gastosTotales, setGastosTotales] = useState(0)
  const [cantidadGastos, setCantidadGastos] = useState(0)
  const [miembroDesde, setMiembroDesde] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEstadisticas = async () => {
      const { data } = await supabase
        .from("gastos")
        .select("monto")
        .eq("user_id", session.user.id)

      if (data) {
        setGastosTotales(data.reduce((acc, g) => acc + parseFloat(g.monto), 0))
        setCantidadGastos(data.length)
      }

      const fecha = new Date(session.user.created_at)
      setMiembroDesde(fecha.toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" }))
    }

    fetchEstadisticas()
  }, [])

  const planColor = {
    free: "text-zinc-400",
    pro: "text-yellow-500",
    business: "text-purple-400"
  }

  const planBadge = {
    free: "bg-zinc-800 text-zinc-400 border-zinc-700",
    pro: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    business: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar session={session} />
      <div className="p-6 max-w-lg mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-white">Perfil</h1>
          <p className="text-zinc-400 mt-1">Tu información y estadísticas</p>
        </motion.div>

        {/* Info usuario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-zinc-900 text-2xl font-black">
              {session.user.email[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-white text-lg">{session.user.email}</p>
              <p className="text-zinc-500 text-sm">Miembro desde {miembroDesde}</p>
            </div>
          </div>
        </motion.div>

        {/* Plan actual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Plan actual</h2>
          <div className="flex justify-between items-center">
            <div>
              <span className={`inline-block border px-3 py-1 rounded-full text-sm font-bold mb-2 ${planBadge[perfil?.plan || "free"]}`}>
                {(perfil?.plan || "free").toUpperCase()}
              </span>
              <p className="text-zinc-400 text-sm">
                {perfil?.plan === "pro" ? "Gastos ilimitados + IA avanzada"
                  : perfil?.plan === "business" ? "Multi-usuario + reportes"
                  : "30 gastos por mes"}
              </p>
            </div>
            {perfil?.plan === "free" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/planes")}
                className="bg-yellow-500 text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-yellow-400 transition"
              >
                Mejorar plan
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-yellow-500">{cantidadGastos}</p>
            <p className="text-zinc-400 text-sm mt-1">Gastos registrados</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center">
            <p className="text-2xl font-black text-white">${gastosTotales.toLocaleString("es-CL")}</p>
            <p className="text-zinc-400 text-sm mt-1">Total histórico</p>
          </div>
        </motion.div>

        {/* Cerrar sesión */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => supabase.auth.signOut()}
          className="w-full bg-zinc-900 border border-zinc-800 text-red-400 py-3 rounded-2xl font-semibold hover:bg-red-500/10 hover:border-red-500/20 transition"
        >
          Cerrar sesión
        </motion.button>

      </div>
    </div>
  )
}