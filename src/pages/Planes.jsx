import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

const planes = [
  {
    nombre: "Free",
    precio: "$0",
    periodo: "para siempre",
    plan: null,
    features: [
      "30 gastos por mes",
      "Dashboard básico",
      "Gráfico por categoría",
      "Calendario de pagos",
    ]
  },
  {
    nombre: "Pro",
    precio: "$5.990",
    periodo: "por mes",
    plan: "pro",
    popular: true,
    features: [
      "Gastos ilimitados",
      "Categorización con IA",
      "Predicción del mes siguiente",
      "Alertas de gastos excesivos",
      "Dashboard avanzado",
      "Exportar a PDF y Excel",
    ]
  },
  {
    nombre: "Business",
    precio: "$19.990",
    periodo: "por mes",
    plan: "business",
    features: [
      "Todo lo del plan Pro",
      "Hasta 10 usuarios",
      "Gestión de equipos",
      "Reportes por área",
      "Panel de administración",
      "Soporte prioritario",
    ]
  }
]

export default function Planes({ session, perfil }) {
  const navigate = useNavigate()

  const handleElegirPlan = async (plan) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/crear-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, user_email: session.user.email })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (error) {
      console.error("Error al crear checkout:", error)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar session={session} />
      <div className="p-6 max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-white mb-3">Elige tu plan</h1>
          <p className="text-zinc-400">Escala según tus necesidades, cancela cuando quieras</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planes.map((plan, i) => (
            <motion.div
              key={plan.nombre}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-zinc-900 border rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                  : "border-zinc-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-zinc-900 text-xs px-3 py-1 rounded-full font-bold">
                  Más popular
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">{plan.nombre}</h2>
                <div>
                  <span className="text-3xl font-black text-white">{plan.precio}</span>
                  <span className="text-zinc-500 text-sm ml-2">{plan.periodo}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="text-yellow-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => plan.plan && handleElegirPlan(plan.plan)}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  plan.popular
                    ? "bg-yellow-500 text-zinc-900 hover:bg-yellow-400"
                    : plan.nombre === "Free"
                    ? "bg-zinc-800 text-zinc-500 cursor-default"
                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                {plan.nombre === "Free"
                  ? perfil?.plan === "free" ? "Plan actual" : "Plan incluido"
                  : perfil?.plan === plan.plan
                  ? "Plan actual ✓"
                  : `Elegir ${plan.nombre}`}
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}