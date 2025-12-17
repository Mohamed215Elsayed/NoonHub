import "./BrandContainer.css";
import { Container, Row} from "react-bootstrap";
import BrandCard from "./BrandCard";

import brand1 from "../../Assets/Images/brand1.png";
import brand2 from "../../Assets/Images/brand2.png";
import brand3 from "../../Assets/Images/brand3.png";

const BrandContainer = ({ showTitle = true }) => {
  const brands = [
    brand1,
    brand2,
    brand3,
    brand2,
    brand1,
    brand3,
    brand1,
    brand2,
    brand3,
    brand2,
    brand1,
    brand3,
    brand1,
    brand2,
    brand3,
    brand2,
    brand1,
    brand3,
  ];

  return (
    <Container className="brand-container py-5">
      {showTitle && (
        <>
          <h2 className="brand-title">أشهر الماركات</h2>
          <div className="brand-line"></div>
        </>
      )}

      <Row className="g-4 g-xl-5 justify-content-center">
        {brands.map((img, index) => (
          // <Col key={index} xs={6} sm={4} md={3} lg={2}>
            <BrandCard img={img} title="علامه" />
          // </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BrandContainer;
