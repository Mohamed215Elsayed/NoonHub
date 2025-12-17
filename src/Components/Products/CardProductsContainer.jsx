import { Container, Row } from "react-bootstrap";
import SubTitle from "../Uitily/ButtonsTitles/SubTitle";
import ProductCard from "./ProductCard/ProductCard";

function CardProductsContainer({ title, btntitle, pathText }) {
  return (
    <Container>
      <SubTitle title={title} btntitle={btntitle} pathText={pathText} />
      <Row className="my-2 d-flex justify-content-between">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Row>
    </Container>
  );
}

export default CardProductsContainer;
