import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import NotFound from './pages/NotFound'
import Cadastro from './pages/Cadastro'
import Lista from './pages/Lista'
import EditarItem from './pages/EditarItem'
import AdicionarLista from './pages/AdicionarLista'
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
            <Route path="/listaCompras" element={<Lista />} />
            <Route path="/listaCompras/editar/:id" element={<EditarItem />} />
            <Route
              path="/listaCompras/adicionar"
              element={<AdicionarLista />}
            />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
        <Footer />
      </UsuarioContext.Provider>
    </>
  )
}

export default App
