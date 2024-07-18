import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../firebase/auth'
import { useContext } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'
import { toast } from 'react-hot-toast'
import Logo from '../assets/img/listafacil-logo.png'

function Menu() {
  const usuario = useContext(UsuarioContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout().then(() => {
      toast.success('Você foi deslogado!')
      navigate('/')
    })
  }

  return (
    <>
      <header>
        <Navbar className="navbar" expand="lg">
          <Container fluid>
            <Link to="/">
              <img src={Logo} />
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="ms-auto">
                {usuario && (
                  <Link className="nav-link" to="/lista">
                    Lista
                  </Link>
                )}
                {!usuario && (
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                )}
                {!usuario && (
                  <Link className="nav-link" to="/cadastro">
                    Cadastro
                  </Link>
                )}
                <Link className="nav-link">Sua Lista</Link>
                {usuario && <span>Olá, {usuario.displayName}!</span>}
                {usuario && (
                  <Button variant="outline-light" onClick={handleLogout}>
                    Sair
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Menu
