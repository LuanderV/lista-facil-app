import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Menu from './components/Menu'
import NotFound from './pages/NotFound'
import Login from './components/Login'
import Cadastro from './pages/Cadastro'
import Lista from './pages/Lista'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config'
import { UsuarioContext } from './contexts/UsuarioContext'
import Loader from './components/Loader'
import Home from './pages/Home'
import Footer from './components/Footer'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUsuarioLogado(user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <UsuarioContext.Provider value={usuarioLogado}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lista" element={<Lista />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" />
        <Footer />
      </UsuarioContext.Provider>
    </>
  )
}

export default App
