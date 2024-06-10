import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Products from './app/pages/products/products';
import Login from './app/pages/login/login';
import {Account} from "./app/pages/account/account";
import {AccountOrders} from "./app/pages/accounOrders/accountOrders";
import {BuyCart} from "./app/pages/buyCart/buyCart";
import {RegisterAccount} from "./app/pages/registerAccount/registerAccount";
import {RegisterIndication} from "./app/pages/registerIndication/registerIndication";
import {RegisterProduct} from "./app/pages/registerProduct/registerProduct";
import NavPages from "./app/pages/navPages/navPages";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route element={<NavPages/>}>
                <Route path="/inicio" element={<Products/>}/>
                <Route path="/conta" element={<Account/>}/>
                <Route path="/carrinho" element={<BuyCart/>}/>
                <Route path="/pedidos" element={<AccountOrders/>}/>
                <Route path="/registrarConta" element={<RegisterAccount/>}/>
                <Route path="/registrarIndicacao" element={<RegisterIndication/>}/>
                <Route path="/registrarProduto" element={<RegisterProduct/>}/>
                <Route path="*" element={<Navigate to="/inicio"/>}/>
            </Route>
        </Routes>
    );
}

export default App;
