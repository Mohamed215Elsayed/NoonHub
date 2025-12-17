import { Row, Col } from "react-bootstrap";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductText from "../ProductText/ProductText";
// import "./ProductDetails.css";
function ProductDetails() {
  return (
    <div>
      <Row className="py-3">
        <Col lg="4">
          <ProductGallery />
        </Col>
        <Col lg="8">
          <ProductText />
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetails;
