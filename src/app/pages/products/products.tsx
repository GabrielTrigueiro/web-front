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
          <ControlledCarousel />
          <ProductCategories />
          <div className="product-list">
            {produtos.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
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

  const { nome, descricao, preco, estoque, img } = product;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`http://localhost:3333${img}`} alt={nome} />
      <Card.Body>
        <Card.Title>{nome}</Card.Title>
        <Card.Text>{descricao}</Card.Text>
        <Card.Text>Preço: R${preco}</Card.Text>
        <Card.Text>Estoque: {estoque}</Card.Text>
        <Button
          disabled={items.some((item) => {
            if (item.product.id === product.id) {
              return item.product.estoque <= item.quantity;
            }
          })}
          onClick={() => addToCart(product)}
          variant="primary"
        >
          + Carrinho
        </Button>
      </Card.Body>
    </Card>
  );
};
