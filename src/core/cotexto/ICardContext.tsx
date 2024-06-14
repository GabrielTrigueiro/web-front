import {createContext, FC, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {Product} from "../models/product";

export interface ICartItem {
    product: Product;
    quantity: number;
}

export interface ICardContext {
    items: ICartItem[];
    clearCart: () => void;
    addToCart: (product: Product) => void;
    removeProduct: (index: number) => void;
    removeOneProduct: (index: number) => void;
}

export const CartContext = createContext<ICardContext>(
    {} as ICardContext
);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {

    const [cart, setCart] = useState<ICartItem[]>(() => {
        // Carregar o estado do localStorage ao inicializar
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        // Salvar o estado do cart no localStorage sempre que ele mudar
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const clearCart = () => {
        setCart([]);
    }

    const removeOneProduct = (index: number) => {
        setCart(
            cart.map((item) => {
                if (item.product.id === index && item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item;
            }).filter((item) => item.quantity > 0)
        )
    }

    const addToCart = (product: Product) => {
        const item = cart.find((item) => item.product.id === product.id);
        if (item) {
            const newCart = cart.map((item) => {
                if (item.product.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item;
            });
            setCart(newCart);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    }

    const removeProduct = (index: number) => {
        const newCart = cart.filter((item) => item.product.id !== index);
        setCart(newCart);
    }

    const contextValue = useMemo(
        () => ({
            items: cart,
            clearCart,
            addToCart,
            removeProduct,
            removeOneProduct
        }),
        [cart]
    );

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    );
};

export function useCartContext(): ICardContext {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
