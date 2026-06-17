import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "./supabase"
import Login from "./pages/Login"

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (loading) return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App