import DefaultNavbar from "../../components/navbar/navbar";
import ControlledCarousel from "../../components/carroucel/carroucel";
import "./style.css";
import DefaultContainer from "../../components/container/container";
import ProductCategories from "../../components/category/category";
import { useCallback, useEffect, useState } from "react";
import { LIST_PRODUCTS } from "../../../core/utils/constans";
import { noAuthAxiosInstance } from "../../../core/api/axios/axiosInstance";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Product } from "../../../core/models/product";
import { useCartContext } from "../../../core/cotexto/ICardContext";
import { useNavigate } from "react-router";

export default function Products() {
  const { addToCart } = useCartContext();

  const [produtos, setProdutos] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    const response = await noAuthAxiosInstance.get(LIST_PRODUCTS);
    setProdutos(response.data);
  }, []);

  // Use useEffect to call fetchProducts when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="full-page-massa">
      <div className=" home-page-body">
        <DefaultContainer>
          <ControlledCarousel products={produtos} />
          <ProductCategories />
          <div className="container">
            <div className="row">
              {produtos.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </DefaultContainer>
      </div>
    </div>
  );
}

interface ICardProps {
  product: any;
  addToCart: (e: Product) => void;
}

const ProductCard = ({ addToCart, product }: ICardProps) => {
  const { items } = useCartContext();

  const navigate = useNavigate();

  const { nome, descricao, preco, estoque, img, id } = product;

  // navega para rota do produto
  const handleClick = () => {
    navigate(`/produto/${id}`);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={id}>
      <div style={{ height: '100%' }} className="card">
        <img onClick={handleClick} src={`http://localhost:3333${img}`} className="card-img-top object-fit-contain" alt={nome} />
        <div className="card-body">
          <h5 className="card-title">{nome}</h5>
          <p className="card-text">{descricao}</p>
          <button disabled={items.some((item) => {
            if (item.product.id === product.id) {
              return item.product.estoque <= item.quantity;
            }
          })} onClick={() => addToCart(product)} className="btn btn-primary">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
};
