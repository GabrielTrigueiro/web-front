import { useEffect } from "react";
import { ICartItem, useCartContext } from "../../../core/cotexto/ICardContext";
import { Product } from "../../../core/models/product";
import { formatCurrencyBR } from "../../../core/utils/globalFunctions";

export const BuyCart = () => {
  const { items } = useCartContext();

  // calcular total
  const total = items.reduce((acc, item) => {
    return acc + item.product.preco * item.quantity;
  }, 0);

  return (
    <div className="card text-center m-auto">
      <div className="card-header">Seu carrinho</div>
      <div className="card-body">
        {items.length > 0 ? (
          <>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </>
        ) : (
          <div style={{ width: 400 }} className="d-flex flex-column">
            <span>Carrinho vazio</span>
            <span>
              <a className="link-dark" href="/inicio" >Voltar as compras?</a>
            </span>
          </div>
        )}
      </div>
      <div className="card-footer text-body-secondary d-flex flex-row justify-content-between">
       <span className="m-2"> Total: {formatCurrencyBR(total)}</span>
        <button className="btn btn-primary">Pagamento</button>
      </div>
    </div>
  );
};

interface ICartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: ICartItemProps) => {
  const { removeProduct, addToCart, removeOneProduct } = useCartContext();

  return (
    <div className="d-flex justify-content-between align-items-center gap-5 mb-3">
      <div className="d-flex flex-row gap-3">
        <img
          style={{ width: 100, height: 100 }}
          src={`http://localhost:3333${item.product.img}`}
          alt={item.product.nome}
        />
        <div
          style={{ width: 200, height: 100 }}
          className="d-flex flex-column text-start justify-content-center"
        >
          <span>Nome: {item.product.nome}</span>
          <span>Quantidade: {item.quantity}x</span>
          <span>Descrição: {item.product.descricao}</span>
        </div>
      </div>
      <div className="d-flex gap-2">
        <div
          style={{ width: 100 }}
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            disabled={item.quantity === item.product.estoque}
            onClick={() => addToCart(item.product)}
            type="button"
            className="btn"
          >
            +
          </button>
          <button
            disabled={item.quantity === 1}
            onClick={() => removeOneProduct(item.product.id!)}
            type="button"
            className="btn"
          >
            -
          </button>
        </div>
        <button
          style={{ width: 100, height: 50 }}
          className="btn btn-danger"
          onClick={() => removeProduct(item.product.id!)}
        >
          Remover
        </button>
      </div>
    </div>
  );
};
