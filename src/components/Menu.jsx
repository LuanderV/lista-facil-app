import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../firebase/auth'
import { useContext } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'
import { toast } from 'react-hot-toast'
import Logo from '../assets/img/listafacil-logo.png'

function Menu({ className }) {
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
      <Navbar className={' navbar ' + className} expand="lg">
        <Container fluid>
          <Link to="/">
            <img src={Logo} />
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link className="nav-link">Home</Link>
              {usuario && (
                <Link className="nav-link" to="/lista">
                  Lista
                </Link>
              )}
              {!usuario && (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
              {!usuario && (
                <Link className="nav-link" to="/cadastro">
                  Cadastro
                </Link>
              )}
              {usuario && (
                <span className=" nav-link">Olá, {usuario.displayName}!</span>
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
