import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

// Elementos flotantes decorativos para romper la sobriedad en el Hero
const floatingElements = [
  { icon: "🪙", top: "15%", left: "10%", delay: 0 },
  { icon: "✨", top: "25%", left: "45%", delay: 1.5 },
  { icon: "🚀", top: "75%", left: "5%", delay: 0.5 },
  { icon: "💸", top: "60%", left: "50%", delay: 2 },
]

export default function Landing() {
  const navigate = useNavigate()

  // Agregamos colores únicos y gradientes a cada feature
  const features = [
    { icon: "🤖", titulo: "IA que te entiende", desc: "Categoriza tus gastos automáticamente con inteligencia artificial. Solo escribe qué compraste.", color: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/20" },
    { icon: "📊", titulo: "Dashboard en tiempo real", desc: "Visualiza tus gastos con gráficos interactivos y filtra por mes para ver tu evolución.", color: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-500/20" },
    { icon: "📅", titulo: "Calendario de pagos", desc: "Nunca más olvides un pago. Organiza tus vencimientos y recibe alertas antes de que sea tarde.", color: "from-orange-400 to-red-500", shadow: "shadow-orange-500/20" },
    { icon: "💼", titulo: "Para tu negocio", desc: "Planes Business con multi-usuario, reportes exportables y panel de administración.", color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" },
  ]

  const testimonios = [
    { nombre: "María C.", rol: "Emprendedora", texto: "Cambió completamente mi forma de ver el dinero. Ahora sé exactamente en qué gasto.", avatar: "MC", color: "from-pink-500 to-rose-500" },
    { nombre: "Felipe R.", rol: "Freelancer", texto: "La IA que categoriza los gastos es increíble. Me ahorra mucho tiempo cada mes.", avatar: "FR", color: "from-blue-500 to-cyan-500" },
    { nombre: "Sofía M.", rol: "Dueña de negocio", texto: "Usamos el plan Business para toda la empresa. Los reportes son muy completos.", avatar: "SM", color: "from-emerald-500 to-teal-500" },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 relative selection:bg-yellow-500/30 overflow-hidden font-sans">
      
      {/* Fondo de cuadrícula global con MÁSCARA DE DESVANECIMIENTO */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      {/* Navbar */}
      <nav className="relative z-50 border-b border-zinc-800/30 bg-zinc-950/60 backdrop-blur-xl sticky top-0">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30"
            >
              <span className="text-xl">💰</span>
            </motion.div>
            <span className="text-white font-black text-xl tracking-tight">FinTrack</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block text-zinc-400 hover:text-white text-sm font-semibold transition-colors"
            >
              Iniciar sesión
            </button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-yellow-500 text-zinc-900 px-6 py-2.5 rounded-xl text-sm font-bold shadow-[0_5px_20px_rgba(234,179,8,0.3)] transition-all hover:bg-yellow-400"
            >
              Empezar gratis
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 lg:pt-32 lg:pb-40">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(234,179,8,0.15)_0%,transparent_60%)] rounded-full pointer-events-none"
        />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,transparent_60%)] rounded-full pointer-events-none" />

        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: el.delay }}
            className="absolute text-4xl hidden lg:block pointer-events-none"
            style={{ top: el.top, left: el.left }}
          >
            {el.icon}
          </motion.div>
        ))}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative">
          {/* Lado izquierdo - Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-700/50 text-zinc-200 text-sm px-4 py-2 rounded-full font-medium mb-8 backdrop-blur-md shadow-xl"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Conoce FinTrack 2.0 ✨
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Domina tus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500">
                finanzas con IA
              </span>
            </h1>
            <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
              Visualiza tus gastos, anticipa tus pagos y toma el control total de tu futuro financiero sin usar aburridas hojas de cálculo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-600 text-zinc-950 px-8 py-4 rounded-xl font-black text-lg shadow-[0_10px_30px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center gap-2"
              >
                Empezar ahora <span className="text-xl">🚀</span>
              </motion.button>
              <button
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto text-zinc-300 px-8 py-4 rounded-xl font-bold text-lg border border-zinc-700 bg-zinc-900/50 hover:bg-white hover:text-zinc-950 backdrop-blur-sm transition-all"
              >
                Ver cómo funciona
              </button>
            </div>
            <p className="text-zinc-500 text-sm mt-6 font-medium">No requiere tarjeta de crédito · 100% Gratis</p>
          </motion.div>

          {/* Lado derecho - Mockup Flotante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-1/2 hidden md:block relative perspective-1000"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-yellow-500/30 via-orange-500/10 to-transparent rounded-[2.5rem] blur-xl"
            />
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-full max-w-md mx-auto bg-zinc-900/90 backdrop-blur-3xl border border-zinc-700/50 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-zinc-400 text-sm font-semibold mb-1">Balance Actual</p>
                  <p className="text-4xl font-black text-white">$14,250.00</p>
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-black flex items-center gap-1">
                  📈 +8.5%
                </div>
              </div>
              <div className="flex items-end gap-3 h-32 mb-8">
                {[30, 50, 40, 70, 55, 90, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`flex-1 rounded-t-lg ${i === 6 ? 'bg-gradient-to-t from-yellow-600 to-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-zinc-800'}`}
                  />
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { icon: "🛒", nombre: "Supermercado", monto: "-$120.50" },
                  { icon: "🎬", nombre: "Netflix", monto: "-$15.99" },
                  { icon: "💻", nombre: "Freelance", monto: "+$850.00", positivo: true },
                ].map((item, i) => (
                  <motion.div 
                    whileHover={{ x: 5, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
                    key={i} 
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-xl shadow-inner">{item.icon}</div>
                      <span className="text-zinc-200 font-bold">{item.nombre}</span>
                    </div>
                    <span className={`font-black tracking-tight ${item.positivo ? 'text-emerald-400' : 'text-white'}`}>{item.monto}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features - AHORA CON MUCHO MÁS COLOR */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20 relative">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Todo lo que necesitas y más 🧰</h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">Herramientas poderosas diseñadas para quitarte el estrés financiero de forma divertida.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.titulo}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-800/80 transition-all duration-300 group overflow-hidden"
            >
              {/* Brillo de fondo en hover que combina con el color del icono */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icono con gradiente vibrante */}
              <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg ${f.shadow} text-white`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{f.titulo}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm font-medium relative z-10">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Planes y Precios - CON LUZ PÚRPURA DE FONDO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        {/* Luz que aparece al hacer scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(168,85,247,0.12)_0%,transparent_60%)] rounded-full pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Precios simples y justos 🤝</h2>
          <p className="text-zinc-400 text-lg md:text-xl">Empieza gratis, escala cuando lo necesites.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {[
            { nombre: "Free", icon: "🌱", precio: "$0", periodo: "para siempre", features: ["30 gastos/mes", "Dashboard básico", "Calendario de pagos"], popular: false },
            { nombre: "Pro", icon: "🔥", precio: "$5.990", periodo: "por mes", features: ["Gastos ilimitados", "IA avanzada predictiva", "Metas de ahorro", "Exportar reportes"], popular: true },
            { nombre: "Business", icon: "🏢", precio: "$19.990", periodo: "por mes", features: ["Todo de Pro", "Hasta 10 usuarios", "Panel admin", "Soporte prioritario 24/7"], popular: false },
          ].map((plan, i) => (
            <motion.div
              key={plan.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              animate={plan.popular ? {
                boxShadow: ["0px 0px 0px rgba(234,179,8,0)", "0px 10px 40px rgba(234,179,8,0.25)", "0px 0px 0px rgba(234,179,8,0)"],
                borderColor: ["#3f3f46", "#eab308", "#3f3f46"]
              } : {}}
              className={`relative bg-zinc-900/80 backdrop-blur-md rounded-3xl p-8 flex flex-col h-full border transition-colors duration-300 ${plan.popular ? "border-yellow-500 scale-105 md:scale-110 z-10 bg-zinc-900" : "border-zinc-800 hover:border-zinc-600"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-zinc-950 text-sm font-black px-4 py-1.5 rounded-full shadow-lg">
                  El más elegido ⭐
                </div>
              )}
              
              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.nombre}</h3>
              <div className="mb-8 flex items-baseline gap-2 border-b border-zinc-800 pb-6">
                <span className="text-5xl font-black text-white tracking-tight">{plan.precio}</span>
                <span className="text-zinc-500 font-medium">{plan.periodo}</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-zinc-300 font-medium">
                    <span className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs ${plan.popular ? 'bg-yellow-500 text-zinc-900' : 'bg-zinc-800 text-zinc-400'}`}>✓</span> 
                    {f}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${plan.popular ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-zinc-950 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-[1.02]" : "bg-zinc-800 text-white hover:bg-zinc-700"}`}
              >
                Empezar {plan.nombre === "Free" ? "gratis" : "ahora"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonios - ENTRADA ESCALONADA DESDE LOS LADOS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Luz azul de fondo para esta sección */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_60%)] rounded-full pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Lo que dicen nuestros usuarios 💬</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonios.map((t, i) => (
            <motion.div
              key={t.nombre}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 80, delay: i * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-800 hover:border-zinc-700 transition-all cursor-default"
            >
              <div className="flex gap-1 text-yellow-500 mb-6 text-xl">★★★★★</div>
              <p className="text-zinc-300 text-lg leading-relaxed italic mb-8 font-medium">"{t.texto}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`w-12 h-12 bg-gradient-to-br ${t.color} rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-bold">{t.nombre}</p>
                  <p className="text-zinc-500 text-sm font-medium">{t.rol}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Final - AHORA CON GRADIENTE ANIMADO EN EL FONDO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] p-1 text-center overflow-hidden shadow-2xl"
        >
          {/* Borde animado del CTA */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(234,179,8,1)_360deg)]"
          />

          <div className="relative bg-zinc-900 rounded-[2.9rem] p-12 md:p-24 overflow-hidden">
            {/* Luz interior palpitante */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(249,115,22,0.3)_0%,transparent_70%)] rounded-full pointer-events-none" 
            />
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">¿Listo para evolucionar?</h2>
              <p className="text-zinc-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">Únete a miles de personas que ya dejaron el estrés financiero en el pasado.</p>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#facc15" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="bg-yellow-500 text-zinc-950 px-10 py-5 rounded-2xl font-black text-xl shadow-[0_10px_40px_rgba(234,179,8,0.4)] transition-all inline-flex items-center gap-3"
              >
                Crear mi cuenta gratis <span className="text-2xl">⚡</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl px-6 py-10 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm font-medium">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
              <span className="text-yellow-500 text-lg">💰</span>
            </div>
            <span className="font-bold text-white text-lg">FinTrack</span>
          </div>
          <p className="text-center md:text-left">© 2026 FinTrack Inc. · Todos los derechos reservados</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-yellow-500 transition-colors">Términos</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Contacto</a>
          </div>
        </div>
      </footer>

    </div>
  )
}