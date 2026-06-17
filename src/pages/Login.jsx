import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import { motion, AnimatePresence } from "framer-motion"

const palabrasDestacadas = ["finanzas", "ahorros", "inversiones"]

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modo, setModo] = useState("login")
  const [palabraIndex, setPalabraIndex] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setPalabraIndex((prev) => (prev + 1) % palabrasDestacadas.length)
    }, 3000)
    return () => clearInterval(intervalo)
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleRegister = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else if (data.user) {
      await supabase.from("perfiles").insert({ id: data.user.id, plan: "free", email })
      setError("Cuenta creada, ya puedes iniciar sesión")
      setModo("login")
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden">

      {/* Panel izquierdo */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:flex w-3/5 bg-zinc-950 flex-col justify-between p-16 relative overflow-hidden min-w-0"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-20 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-0 w-80 h-80 bg-yellow-600 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30 cursor-pointer"
            >
              <span className="text-2xl">💰</span>
            </motion.div>
            <span className="text-white font-black text-2xl tracking-tight">FinTrack</span>
          </div>
          <div className="text-zinc-500 text-sm font-medium border border-zinc-800 px-4 py-1.5 rounded-full">
            Versión 2.0 ✨
          </div>
        </div>

        <div className="relative z-10 flex w-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="max-w-xl"
          >
            <h2 className="text-5xl xl:text-6xl font-black text-white leading-[1.1] mb-6">
              Conquista tus <br />
              <div className="h-[1.2em] relative overflow-hidden mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={palabraIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                  >
                    {palabrasDestacadas[palabraIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              con FinTrack 🚀
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10 pr-10">
              La plataforma todo en uno para visualizar tus gastos, anticipar tus pagos y tomar el control total de tu futuro con inteligencia artificial.
            </p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 p-4 rounded-2xl w-max"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                MC
              </div>
              <div>
                <div className="flex text-yellow-500 text-sm mb-1">★★★★★</div>
                <p className="text-zinc-300 text-sm italic">"Cambió mi forma de ver el dinero. Increíble."</p>
                <p className="text-zinc-500 text-xs mt-0.5 font-medium">María C. · Emprendedora</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden xl:block relative right-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-72 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">💳</div>
                <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded-lg">+12.5%</span>
              </div>
              <p className="text-zinc-400 text-sm mb-1">Balance Total</p>
              <p className="text-3xl font-black text-white tracking-tight">$24,590.00</p>
              <div className="flex items-end gap-2 mt-6 h-12">
                {[40, 70, 45, 90, 65, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                    className={`w-full rounded-t-sm ${i === 5 ? "bg-yellow-500" : "bg-zinc-700"}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-10 w-full flex justify-between items-center text-zinc-600 text-sm font-medium">
          <p>© 2026 FinTrack</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-400 transition">Privacidad</a>
            <a href="#" className="hover:text-zinc-400 transition">Términos</a>
          </div>
        </div>
      </motion.div>

      {/* Panel derecho */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full lg:w-2/5 bg-zinc-900 flex items-center justify-center p-8 relative z-20 overflow-y-auto"
      >
        <div className="w-full max-w-[360px] relative z-10 py-10">

          <div className="flex items-center gap-3 mb-10 lg:hidden justify-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className="text-white font-black text-2xl">FinTrack</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={modo}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-black text-white mb-2">
                {modo === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
              </h2>
              <p className="text-zinc-400 text-sm mb-8">
                {modo === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
                <button
                  onClick={() => setModo(modo === "login" ? "register" : "login")}
                  className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors"
                >
                  {modo === "login" ? "Regístrate gratis" : "Inicia sesión"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-start gap-2"
              >
                <span>⚠️</span><span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-zinc-300 mb-1.5 block">Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 placeholder-zinc-600 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-zinc-300 block">Contraseña</label>
                {modo === "login" && (
                  <a href="#" className="text-xs text-zinc-500 hover:text-yellow-500 transition-colors">¿Olvidaste tu contraseña?</a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 placeholder-zinc-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={modo === "login" ? handleLogin : handleRegister}
            disabled={loading}
            className="w-full mt-6 bg-yellow-500 text-zinc-950 py-3.5 rounded-xl font-bold hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] disabled:opacity-70 flex justify-center"
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full"
              />
            ) : modo === "login" ? "Iniciar sesión" : "Crear cuenta gratis"}
          </motion.button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-zinc-800 flex-1"></div>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">O continuar con</span>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          <button className="w-full bg-transparent border border-zinc-700 text-white py-3.5 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

        </div>
      </motion.div>
    </div>
  )
}