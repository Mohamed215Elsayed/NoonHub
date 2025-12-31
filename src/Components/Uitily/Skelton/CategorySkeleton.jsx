import { Col, Card } from "react-bootstrap";
import "./CategorySkeleton.css";

const CategorySkeleton = ({ count = 6, colors = [] }) => {
  return Array.from({ length: count }).map((_, index) => {
    const bgColor =
      colors.length > 0 ? colors[index % colors.length] : "#f1f1f1";

    return (
      <Col key={index} xs="6" sm="4" md="3" lg="2">
        <Card
          className="category-skeleton"
          style={{ backgroundColor: bgColor }}
        >
          <div className="skeleton-img"></div>
          <div className="skeleton-text"></div>
        </Card>
      </Col>
    );
  });
};

export default CategorySkeleton;
