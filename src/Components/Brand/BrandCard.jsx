import "./BrandCard.css";
import { Col, Card } from "react-bootstrap";

const BrandCard = ({ img }) => {
  return (
    <Col xs={6} sm={4} md={3} lg={2} className="px-2">
      <Card className="brand-card">
        <Card.Img
          variant="top"
          src={img}
          alt="brand"
          className="brand-card-img"
        />
      </Card>
    </Col>
  );
};

export default BrandCard;
