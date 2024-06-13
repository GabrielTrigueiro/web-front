import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome, FaUser, FaShoppingCart } from 'react-icons/fa';

import './styles.css';
import { useAuth } from '../../../core/cotexto/authContext';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function DefaultNavbar() {

    const { auth } = useAuth();

    const [userType, setUserType] = useState("")

    const signOut = () => {
        localStorage.removeItem("@AuthData");
        window.location.reload();
    }

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("@AuthData");
            if (token) {
                const { type }: any = jwtDecode(token);
                setUserType(type);
            }
        }
        getUser();
    }, [])


    console.log(userType);


    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="/inicio">E-Commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/inicio">
                            <FaHome size={20} /> Início
                        </Nav.Link>
                        {userType !== 'seller' && <Nav.Link href="/carrinho">
                            <FaShoppingCart size={20} /> Carrinho
                        </Nav.Link>}
                        {userType === 'seller' && <>
                            <Nav.Link href="/registrarProduto">
                                <FaShoppingCart size={20} /> Cadastrar produto
                            </Nav.Link>
                            <Nav.Link href="/registrarIndicacao">
                                <FaShoppingCart size={20} /> Cadastrar indicação
                            </Nav.Link>
                        </>}
                        <NavDropdown title={<span><FaUser size={20} /> Perfil</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/conta">Conta</NavDropdown.Item>
                            {userType !== 'seller' && <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => signOut()} >Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default DefaultNavbar;