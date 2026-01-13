import { Container, Row } from "react-bootstrap";
import SubTitle from "../Uitily/ButtonsTitles/SubTitle";
import ProductCard from "./ProductCard/ProductCard";
import CategorySkeleton from "../Uitily/Skelton/CategorySkeleton";
import CategoryEmptyState from "../Uitily/CategoryEmptyState";
import CardContainerHook from "../../Hook/wishList/card-container-hook";

function CardProductsContainer({
  title,
  btntitle,
  pathText,
  products,
  loading,
}) {
  CardContainerHook();

  return (
    <Container>
      {title && (
        <SubTitle title={title} btntitle={btntitle} pathText={pathText} />
      )}

      <Row className="my-2 d-flex">
        {loading ? (
          <div className="d-flex justify-content-center my-5 w-100">
            <CategorySkeleton count={4} />
          </div>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="w-100 text-center my-5">
            <CategoryEmptyState />
            <h4 className="text-muted">لا توجد منتجات حالياً</h4>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default CardProductsContainer;
