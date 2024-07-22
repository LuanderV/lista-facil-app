import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../firebase/auth'
import { useContext } from 'react'
import { UsuarioContext } from '../contexts/UsuarioContext'
import { toast } from 'react-hot-toast'
import Logo from '../assets/img/listafacil-logo.png'

function Menu(props) {
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
      <Navbar
        className={`navbar  ${props.corHome} ${props.corLista} ${props.corCadastro} contain-menu`}
        expand="lg"
      >
        <Container fluid>
          {usuario && (
            <Link to="/listaCompras">
              <img src={Logo} alt="Logo" />
            </Link>
          )}
          {!usuario && (
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          )}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {usuario && (
                <Link
                  className="nav-link fw-semibold text-lista-menu"
                  to="/listaCompras"
                >
                  Lista de Compras
                </Link>
              )}
              {!usuario && (
                <Link className="nav-link fw-semibold" to="/">
                  Login
                </Link>
              )}
              {!usuario && (
                <Link className="nav-link fw-semibold" to="/cadastro">
                  Cadastro
                </Link>
              )}
              {usuario && (
                <span className="nav-link fw-medium">
                  Olá, {usuario.displayName}!
                </span>
              )}
              {usuario && (
                <Button className="btn-exit" onClick={handleLogout}>
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
