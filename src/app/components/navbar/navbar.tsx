import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FaHome, FaUser, FaShoppingCart} from 'react-icons/fa';

import './styles.css';

function DefaultNavbar() {

    const signOut = () =>{
        localStorage.removeItem("@AuthData");
        window.location.reload();
    }

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="/inicio">E-Commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/inicio">
                            <FaHome size={20}/> Início
                        </Nav.Link>
                        <Nav.Link href="/carrinho">
                            <FaShoppingCart size={20}/> Carrinho
                        </Nav.Link>
                        <NavDropdown title={<span><FaUser size={20}/> Perfil</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/conta">Conta</NavDropdown.Item>
                            <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => signOut()} >Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default DefaultNavbar;