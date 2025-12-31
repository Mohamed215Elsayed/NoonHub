import "./BrandContainer.css";
import { Container, Row } from "react-bootstrap";
import BrandCard from "./BrandCard";
import CategorySkeleton from "../Uitily/Skelton/CategorySkeleton";
import CategoryEmptyState from "../Uitily/CategoryEmptyState";

const BrandContainer = ({ brand, loading, showTitle = true }) => {
  return (
    <Container className="brand-container py-5">
      {showTitle && (
        <>
          <h2 className="brand-title">أشهر الماركات</h2>
          <div className="brand-line"></div>
        </>
      )}

      <Row className="g-4 g-xl-5 justify-content-center">
        {loading && <CategorySkeleton count={6} />}
        {!loading &&
          brand?.length > 0 &&
          brand.map((item) => (
            <BrandCard key={item._id} img={item.image} title={item.name} />
          ))}
        {!loading && (!brand || brand.length === 0) && <CategoryEmptyState />}
      </Row>
    </Container>
  );
};

export default BrandContainer;
