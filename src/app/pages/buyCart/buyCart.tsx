import { useEffect, useState } from "react";

import { ICartItem, useCartContext } from "../../../core/cotexto/ICardContext";
import { formatCurrencyBR } from "../../../core/utils/globalFunctions";
import { axiosInstance } from "../../../core/api/axios/axiosInstance";
import { NEW_SALE } from "../../../core/utils/constans";
import { jwtDecode } from "jwt-decode";
import { Indication } from "../../../core/models/indication";
import CustomToast from "../../components/toast/toast";

interface ISalePayload {
  valor_total: number;
  cliente_id: number;
  indicacao_id: number;
  num_parcelas: number;
  produtos: ICartItem[];
}

export const BuyCart = () => {
  const { items, clearCart } = useCartContext();

  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(null);
  const [total, setTotal] = useState(items.reduce((acc, item) => {
    return acc + item.product.preco * item.quantity;
  }, 0))

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indication, setIndication] = useState<Indication>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"error" | "success">("success");

  useEffect(() => {
    setTotal((items.reduce((acc, item) => {
      return acc + item.product.preco * item.quantity;
    }, 0)) - (indication?.desconto ?? 0))
  }, [items, indication])

  // verificar a indicacao
  const verifyIndication = async () => {
    if (inputValue === "") return;
    try {
      const response = await axiosInstance.get(`/indication/${inputValue}`);
      console.log(response.data);
      setIndication(response.data);
      setError(null);
      setToastMessage("Indicação verificada");
      setToastType("success");
      setShowToast(true);
    } catch (err: any) {
      // Erro: capturar a mensagem lançada pelo interceptor
      console.log("fora");
      console.log(err.message);
      setIndication(undefined);
      setError(err.message);
    }
  };

  // pegar as infos do usuario pelo token
  const getUserIdFromToken = (token: string | null): number | null => {
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    console.log(decoded);
    return decoded.id;
  };

  // realizar a compra
  const handleSubmit = async () => {
    // setIsSubmitting(true);
    setError(null);
    const saleData = {
      valor_total: indication ? total - indication.desconto : total,
      cliente_id: getUserIdFromToken(isAuthenticated),
      indicacao_id: indication?.id ?? null, // Ajuste conforme necessário
      num_parcelas: 1, // Ajuste conforme necessário
      produtos: items.map((item) => ({
        produto_id: item.product.id,
        quantidade: item.quantity,
      })),
    };

    console.log(saleData);

    try {
      const response = await axiosInstance.post(NEW_SALE, saleData);
      setToastMessage("Compra bem sucedida!");
      setToastType("success");
      setShowToast(true);
      setIndication(undefined);
      clearCart();
    } catch (err) {
      console.error("Erro ao realizar a compra", err);
      setError("Erro ao realizar a compra");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getToken = () => {
    const token = localStorage.getItem("@AuthData");
    if (token) {
      setIsAuthenticated(token);
    }
  };

  useEffect(() => {
    verifyIndication();
  }, [inputValue]);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <CustomToast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
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
                <a className="link-dark" href="/inicio">
                  Voltar as compras?
                </a>
              </span>
            </div>
          )}
        </div>
        {items.length > 0 && (
          <>
            <div className="card-footer text-body-secondary d-flex flex-row justify-content-between">
              <span className="m-2"> Total: {formatCurrencyBR(total)}</span>
              <button
                data-bs-toggle={isAuthenticated && "modal"}
                data-bs-target={isAuthenticated && "#exampleModal"}
                className="btn btn-primary"
                onClick={() => {
                  if (!isAuthenticated) {
                    window.location.href = "/login";
                  }
                }}
              >
                Pagamento
              </button>
            </div>
          </>
        )}

        {/* modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Finalizar compra
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="m-3"> Total: {formatCurrencyBR(total)}</div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Cupom?
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  data-bs-dismiss="modal"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : "Finalizar Compra"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {showToast && (
          <div
            className={`toast ${toastType === "success" ? "toast-success" : "toast-error"
              }`}
          >
            {toastMessage}
          </div>
        )}
      </div>
    </>
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
