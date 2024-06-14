import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../core/api/axios/axiosInstance";
import { USER_ORDERS } from "../../../core/utils/constans";
import { formatCurrencyBR } from "../../../core/utils/globalFunctions";

interface OrderProducts {
    id: string;
    nome: string;
    descricao: string;
    preco: string;
    estoque: string;
    img: string;
    categoria: string;
    quantidade: string;
}

interface Order {
    id: number;
    valor_total: number;
    cliente_id: number;
    indicacao_id: null;
    num_parcelas: number;
    produtos: OrderProducts[];
}

export const AccountOrders = () => {

    const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);
    const [items, setItems] = useState<Order[]>([]);

    // pegar as infos do usuario pelo token
    const getUserIdFromToken = (token: string | null): number | null => {
        if (!token) return null;
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        return decoded.id;
    };

    const getToken = () => {
        const token = localStorage.getItem("@AuthData");
        if (token) {
            setIsAuthenticated(token);
        }
    };

    // encontrar pedidos do usuário
    const findOrders = async () => {
        // pegar is do usuário logado
        const response = await axiosInstance.get(USER_ORDERS + getUserIdFromToken(isAuthenticated));
        setItems(response.data);
    }

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            findOrders();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        console.log(items);
    }, [items]);

    if (!isAuthenticated) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: 400 }}>
                <span>Você precisa estar logado para acessar essa página</span>
                <a href="/login">Já tenho uma conta</a>
                <a href="/registrarConta">Registrar-se</a>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: 400 }}>
                <span>Nenhuma compra encontrada</span>
            </div>
        );
    }

    return (
        <div className="card text-center m-auto">
            <div className="card-header">Suas compras</div>
            <div className="card-body">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

interface ICartItemProps {
    item: Order;
}

const CartItem = ({ item }: ICartItemProps) => {
    return (
        <div className="d-flex justify-content-between align-items-center gap-5 mb-3">
            <div className="d-flex flex-row gap-3">
                <img
                    style={{ width: 100, height: 100 }}
                    src={`http://localhost:3333${item.produtos[0].img}`}
                    alt={item.produtos[0].nome}
                />
                <div
                    style={{ width: 200, height: 100 }}
                    className="d-flex flex-column text-start justify-content-center"
                >
                    <span>Nome: {item.produtos[0].nome}</span>
                    <span>Valor da compra: {formatCurrencyBR(item.valor_total)}</span>
                    <span>Outro(s) {item.produtos.length} item(s).</span>
                </div>
            </div>
            <div className="d-flex gap-2">
            </div>
        </div>
    );
};
