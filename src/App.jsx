import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "./supabase"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Calendario from "./pages/Calendario"
import Perfil from "./pages/Perfil"
import Planes from "./pages/Planes"
import Landing from "./pages/Landing"

function App() {
  const [session, setSession] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchPerfil(session.user.id)
      else setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchPerfil(session.user.id)
      else setPerfil(null)
    })
  }, [])

  const fetchPerfil = async (userId) => {
    const { data } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", userId)
      .single()

    setPerfil(data)
    setLoading(false)
  }

  if (loading) return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!session ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={session ? <Dashboard session={session} perfil={perfil} /> : <Navigate to="/" />} />
        <Route path="/calendario" element={session ? <Calendario session={session} perfil={perfil} /> : <Navigate to="/" />} />
        <Route path="/perfil" element={session ? <Perfil session={session} perfil={perfil} /> : <Navigate to="/" />} />
        <Route path="/planes" element={session ? <Planes session={session} perfil={perfil} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App