import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../../core/models/product';
import { LIST_PRODUCTS } from '../../../core/utils/constans';
import { noAuthAxiosInstance } from '../../../core/api/axios/axiosInstance';
import { formatCurrencyBR } from '../../../core/utils/globalFunctions';
import { useCartContext } from '../../../core/cotexto/ICardContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addToCart } = useCartContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await noAuthAxiosInstance.get(LIST_PRODUCTS);
      setProducts(response.data);
    } catch (error) {
      console.log('Erro ao procurar produtos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item.id === parseInt(id!));
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (product === null) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className={'w-50 m-auto d-flex flex-row bg-light shadow-sm rounded p-1'}>
      <img style={{ width: 300, height: 300 }} src={`http://localhost:3333${product.img}`} alt={product.nome} />
      <div className='d-flex flex-column text-center flex-fill m-auto px-5'>
        <h3>{product.nome}</h3>
        <p>Preço: {formatCurrencyBR(product.preco)}</p>
        <p>Sobre este produto: {product.descricao}</p>
        <button
          className='btn btn-primary'
          onClick={() => addToCart(product)}
          disabled={items.some((item) => {
            if (item.product.id === product.id) {
              return item.product.estoque <= item.quantity;
            }
          })}
        >Comprar</button>
      </div>
    </div>
  );
};

export default ProductPage;
