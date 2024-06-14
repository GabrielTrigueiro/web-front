import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Product } from '../../../core/models/product';

interface ICarouselProps {
  products: Product[];
}

function ControlledCarousel(props: ICarouselProps) {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  if (props.products.length === 0) return <div>Carregando...</div>

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-80 h-20 m-auto"
          style={{ height: "40svh", width: "30svw", objectFit: "cover" }}
          src={`http://localhost:3333${props.products[0].img}`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-80 h-20 m-auto"
          style={{ height: "40svh", width: "30svw", objectFit: "cover" }}
          src={`http://localhost:3333${props.products[1].img}`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-80 h-20 m-auto"
          style={{ height: "40svh", width: "30svw", objectFit: "cover" }}
          src={`http://localhost:3333${props.products[4].img}`}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
