import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"

export default function Calendario({ session, perfil }) {
  const [pagos, setPagos] = useState([])
  const [nombre, setNombre] = useState("")
  const [monto, setMonto] = useState("")
  const [fechaLimite, setFechaLimite] = useState("")
  const [mensaje, setMensaje] = useState(null)

  const fetchPagos = async () => {
    const { data, error } = await supabase
      .from("pagos_pendientes")
      .select("*")
      .eq("user_id", session.user.id)
      .order("fecha_limite", { ascending: true })

    if (!error) setPagos(data)
  }

  useEffect(() => {
    fetchPagos()
  }, [])

  const handleAgregarPago = async () => {
    if (!nombre || !monto || !fechaLimite) {
      setMensaje("Por favor completa todos los campos")
      return
    }

    const { error } = await supabase.from("pagos_pendientes").insert({
      user_id: session.user.id,
      nombre,
      monto: parseFloat(monto),
      fecha_limite: fechaLimite,
      pagado: false
    })

    if (error) {
      setMensaje("Error al guardar el pago")
    } else {
      setMensaje("Pago agregado correctamente ✅")
      setNombre("")
      setMonto("")
      setFechaLimite("")
      fetchPagos()
    }
  }

  const handleMarcarPagado = async (id, pagado) => {
    await supabase.from("pagos_pendientes").update({ pagado: !pagado }).eq("id", id)
    fetchPagos()
  }

  const handleEliminar = async (id) => {
    await supabase.from("pagos_pendientes").delete().eq("id", id)
    fetchPagos()
  }

  const hoy = new Date().toISOString().split("T")[0]
  const pendientes = pagos.filter(p => !p.pagado)
  const pagados = pagos.filter(p => p.pagado)

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar session={session} perfil={perfil} />
      <div className="p-6 max-w-2xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-white">Calendario 📅</h1>
          <p className="text-zinc-400 mt-1">Organiza tus pagos y vencimientos</p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Agregar pago pendiente</h2>

          <AnimatePresence>
            {mensaje && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl mb-4"
              >
                {mensaje}
              </motion.div>
            )}
          </AnimatePresence>

          <input
            type="text"
            placeholder="Nombre del pago (ej: Arriendo, Cuenta de luz)"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-zinc-600"
          />
          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="number"
              placeholder="Monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-zinc-600"
            />
            <input
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAgregarPago}
            className="w-full bg-yellow-500 text-zinc-900 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Agregar pago
          </motion.button>
        </motion.div>

        {/* Pendientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Pendientes 🔴</h2>
          {pendientes.length === 0 ? (
            <p className="text-zinc-500 text-center text-sm py-6">No hay pagos pendientes</p>
          ) : (
            pendientes.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-white">{p.nombre}</p>
                  <p className={`text-xs mt-1 ${p.fecha_limite < hoy ? "text-red-400 font-semibold" : "text-zinc-500"}`}>
                    {p.fecha_limite < hoy ? "⚠️ Vencido · " : "📅 "}{p.fecha_limite}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-yellow-500">${parseFloat(p.monto).toLocaleString("es-CL")}</p>
                  <button
                    onClick={() => handleMarcarPagado(p.id, p.pagado)}
                    className="text-zinc-600 hover:text-green-400 transition text-lg"
                    title="Marcar como pagado"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    className="text-zinc-600 hover:text-red-400 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Pagados */}
        {pagados.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            <h2 className="text-lg font-bold text-white mb-4">Pagados ✅</h2>
            {pagados.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0 opacity-40">
                <div>
                  <p className="font-medium text-white line-through">{p.nombre}</p>
                  <p className="text-xs text-zinc-500 mt-1">{p.fecha_limite}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-zinc-400">${parseFloat(p.monto).toLocaleString("es-CL")}</p>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    className="text-zinc-600 hover:text-red-400 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  )
}