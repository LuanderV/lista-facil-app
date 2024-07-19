import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../firebase/auth'
import { useContext } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'
import { toast } from 'react-hot-toast'
import Logo from '../assets/img/listafacil-logo.png'

function Menu({ corHome }) {
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
      <Navbar className={' navbar ' + corHome} expand="lg">
        <Container fluid>
          <Link to="/">
            <img src={Logo} />
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link className="nav-link fw-semibold">Home</Link>
              {usuario && (
                <Link className="nav-link fw-semibold" to="/lista">
                  Lista
                </Link>
              )}
              {!usuario && (
                <Link className="nav-link fw-semibold" to="/login">
                  Login
                </Link>
              )}
              {!usuario && (
                <Link className="nav-link fw-semibold" to="/cadastro">
                  Cadastro
                </Link>
              )}
              {usuario && (
                <span className=" nav-link fw-medium">
                  Olá, {usuario.displayName}!
                </span>
              )}
              {usuario && (
                <Button variant="outline-light" onClick={handleLogout}>
                  Sair
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Menu
