import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome, FaUser, FaShoppingCart } from 'react-icons/fa'; // Exemplos de ícones

import './styles.css';

interface INavbarProps {
    userName: string;
}

function DefaultNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
    <Container>
      <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">
            <FaHome size={20} /> Início
          </Nav.Link>
          <Nav.Link href="#link">
            <FaShoppingCart size={20} /> Carrinho
          </Nav.Link>
          <NavDropdown title={<span><FaUser size={20} /> Perfil</span>} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Conta</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Pedidos</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Sair</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default DefaultNavbar;