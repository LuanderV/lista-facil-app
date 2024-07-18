import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.png";
import { logout } from "../firebase/auth";
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UsuarioContext";

function Menu() {
    const usuario = useContext(UsuarioContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout().then(() => {
            toast.success("Você foi deslogado!")
            navigate("/login");
        });
    }

    return (
        <>
            <header>
                <Navbar className="navbar" expand="lg">
                    <Container fluid>
                        <Link to="/"><img src={Logo}/></Link>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="ms-auto">
                                { usuario && <Link className="nav-link" to="/lista">Lista</Link> }
                                { !usuario && <Link className="nav-link" to="/">Login</Link> }
                                { !usuario &&<Link className="nav-link" to="/cadastro">Cadastro</Link> }
                                { usuario && <Button variant="outline-light" onClick={handleLogout}>Sair</Button> }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}

export default Menu;