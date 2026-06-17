import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"

const COLORES = {
  "Alimentación": "#f59e0b",
  "Transporte": "#10b981",
  "Entretenimiento": "#8b5cf6",
  "Salud": "#ef4444",
  "Educación": "#3b82f6",
  "Ropa": "#ec4899",
  "Otros": "#6b7280"
}

export default function Dashboard({ session, perfil }) {
  const [descripcion, setDescripcion] = useState("")
  const [monto, setMonto] = useState("")
  const [categoria, setCategoria] = useState("Alimentación")
  const [fecha, setFecha] = useState("")
  const [mensaje, setMensaje] = useState(null)
  const [gastos, setGastos] = useState([])
  const [mesFiltro, setMesFiltro] = useState(() => {
    const hoy = new Date()
    return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}`
  })

  const fetchGastos = async () => {
    const [anio, mes] = mesFiltro.split("-")
    const desde = `${anio}-${mes}-01`
    const ultimoDia = new Date(anio, mes, 0).getDate()
    const hasta = `${anio}-${mes}-${ultimoDia}`

    const { data, error } = await supabase
      .from("gastos")
      .select("*")
      .eq("user_id", session.user.id)
      .gte("fecha", desde)
      .lte("fecha", hasta)
      .order("fecha", { ascending: false })

    if (!error) setGastos(data)
  }

  useEffect(() => {
    fetchGastos()
  }, [mesFiltro])

  const handleCategorizarIA = async (texto) => {
    if (!texto) return
    try {
      const res = await fetch("http://127.0.0.1:8000/categorizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: texto })
      })
      const data = await res.json()
      if (data.categoria) setCategoria(data.categoria)
    } catch (error) {
      console.error("Error al categorizar:", error)
    }
  }

  const handleAgregarGasto = async () => {
    if (!descripcion || !monto || !fecha) {
      setMensaje("Por favor completa todos los campos")
      return
    }

    if (perfil?.plan === "free" && gastos.length >= 30) {
      setMensaje("Alcanzaste el límite de 30 gastos del plan Free 🔒")
      return
    }

    const { error } = await supabase.from("gastos").insert({
      user_id: session.user.id,
      descripcion,
      monto: parseFloat(monto),
      categoria,
      fecha,
    })

    if (error) {
      setMensaje("Error al guardar el gasto")
    } else {
      setMensaje("Gasto agregado correctamente ✅")
      setDescripcion("")
      setMonto("")
      setFecha("")
      fetchGastos()
    }
  }

  const handleEliminarGasto = async (id) => {
    const { error } = await supabase.from("gastos").delete().eq("id", id)
    if (!error) fetchGastos()
  }

  const totalMes = gastos.reduce((acc, g) => acc + parseFloat(g.monto), 0)

  const datosPorCategoria = Object.entries(
    gastos.reduce((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] || 0) + parseFloat(g.monto)
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar session={session} />
      <div className="p-6 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Resumen de tus finanzas personales</p>
        </motion.div>

        {/* Filtro de mes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6"
        >
          <label className="text-sm text-zinc-400 mb-2 block">Filtrando mes</label>
          <input
            type="month"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            <p className="text-zinc-400 text-sm mb-1">Total gastado</p>
            <p className="text-3xl font-black text-yellow-500">${totalMes.toLocaleString("es-CL")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            <p className="text-zinc-400 text-sm mb-1">Gastos registrados</p>
            <p className="text-3xl font-black text-white">
              {gastos.length}
              {perfil?.plan === "free" && <span className="text-zinc-500 text-lg"> / 30</span>}
            </p>
          </motion.div>
        </div>

        {/* Gráfico */}
        {datosPorCategoria.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6"
          >
            <h2 className="text-lg font-bold text-white mb-4">Gastos por categoría</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={datosPorCategoria} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {datosPorCategoria.map((entry) => (
                    <Cell key={entry.name} fill={COLORES[entry.name] || "#6b7280"} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString("es-CL")}`}
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px", color: "#fff" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Agregar gasto 💸</h2>

          {mensaje && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl mb-4">
              {mensaje}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              onBlur={(e) => handleCategorizarIA(e.target.value)}
              className="col-span-2 bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-zinc-600"
            />
            <input
              type="number"
              placeholder="Monto"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-zinc-600"
            />
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option>Alimentación</option>
            <option>Transporte</option>
            <option>Entretenimiento</option>
            <option>Salud</option>
            <option>Educación</option>
            <option>Ropa</option>
            <option>Otros</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAgregarGasto}
            className="w-full bg-yellow-500 text-zinc-900 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Agregar gasto
          </motion.button>
        </motion.div>

        {/* Listado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
        >
          <h2 className="text-lg font-bold text-white mb-4">Mis gastos</h2>
          {gastos.length === 0 ? (
            <p className="text-zinc-500 text-center text-sm py-8">No hay gastos registrados este mes</p>
          ) : (
            gastos.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-white">{g.descripcion}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{g.categoria}</span>
                    <span className="text-xs text-zinc-500">{g.fecha}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-yellow-500">${parseFloat(g.monto).toLocaleString("es-CL")}</p>
                  <button
                    onClick={() => handleEliminarGasto(g.id)}
                    className="text-zinc-600 hover:text-red-400 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

      </div>
    </div>
  )
}