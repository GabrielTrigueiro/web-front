import DefaultNavbar from "../../components/navbar/navbar";
import ControlledCarousel from "../../components/carroucel/carroucel";
import "./style.css";
import DefaultContainer from "../../components/container/container";
import ProductCategories from "../../components/category/category";

type Props = {};

export default function Products({}: Props) {
  return (
    <div className="full-page">
      <DefaultNavbar />
      <div className="home-page-body">
        <DefaultContainer>
          <ControlledCarousel />
          <ProductCategories/>
          <div className="product-list">
              oi
          </div>
        </DefaultContainer>
      </div>
    </div>
  );
}
