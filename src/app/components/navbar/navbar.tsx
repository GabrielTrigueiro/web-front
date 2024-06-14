import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FaHome, FaUser, FaShoppingCart, FaShare, FaBox} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';

import './styles.css';
import {useCartContext} from "../../../core/cotexto/ICardContext";

function DefaultNavbar() {

    const {items} = useCartContext();

    const [userType, setUserType] = useState("")

    const signOut = () => {
        localStorage.removeItem("@AuthData");
        window.location.reload();
    }

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("@AuthData");
            if (token) {
                const {type}: any = jwtDecode(token);
                setUserType(type);
            }
        }
        getUser();
    }, [])


    console.log(userType);


    return (
        <Navbar expand={'lg'} className="custom-navbar px-3 sticky-md-top">
            <Navbar.Brand href="/inicio">E-Commerce</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="w-100 d-flex flex-row justify-content-end">
                    <Nav.Link href="/inicio">
                        <FaHome size={20}/> Início
                    </Nav.Link>
                    {userType !== 'seller' && <Nav.Link href="/carrinho">
                        <FaShoppingCart size={20}/> Carrinho {items.length > 0 && <span
                        className="badge text-bg-secondary">{items.length}</span>}
                    </Nav.Link>}
                    {userType === 'seller' && <>
                        <Nav.Link href="/registrarProduto">
                            <FaBox size={20}/> Cadastrar produto
                        </Nav.Link>
                        <Nav.Link href="/registrarIndicacao">
                            <FaShare size={20}/> Cadastrar indicação
                        </Nav.Link>
                    </>}
                    <NavDropdown title={<span><FaUser size={20}/> Perfil</span>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/conta">Conta</NavDropdown.Item>
                        {userType !== 'seller' && <NavDropdown.Item href="/pedidos">Pedidos</NavDropdown.Item>}
                        {(userType === 'seller' || userType === "client") && <>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => signOut()}>Sair</NavDropdown.Item></>}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default DefaultNavbar;