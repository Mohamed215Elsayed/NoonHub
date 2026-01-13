import "./ProductText.css";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import ViewProductsDetalisHook from "../../../Hook/product/view-products-detalis-hook";
import { useParams } from "react-router-dom";
const ProductText = () => {
  const { id } = useParams();
  const { item, cat, brand } = ViewProductsDetalisHook(id);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="product-text-section">
      <Row className="mb-2">
        <Col>
          <span className="product-category">{cat.name || "تصنيف عام"} </span>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={10}>
          <h1 className="product-title d-flex flex-wrap align-items-center gap-3">
            {item.title}
            <span className="product-rating">
              <i className="fas fa-star"></i> {item.ratingsAverage || 0}
            </span>
          </h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={10}>
          <span className="product-brand-label">الماركة :</span>
          <span className="product-brand-name">
            {brand.name || "غير محددة"}
          </span>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={10}>
          <div className="color-options">
            {item.colors && item.colors.length > 0
              ? item.colors.map((color, index) => (
                  <span
                    key={index}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))
              : null}
          </div>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
          <span className="product-specs-title">المواصفات :</span>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={12}>
          <p className={`product-description ${showMore ? "expanded" : ""}`}>
            {item.description}
          </p>
          {item.description?.length > 100 && (
            <span className="read-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? "عرض أقل" : "عرض المزيد"}
            </span>
          )}
        </Col>
      </Row>

      <Row className="align-items-center g-3">
        <Col xs={12} md="auto">
          <div className="product-price">
            {item.price ? `${item.price.toLocaleString()} جنيه` : ""}
          </div>
        </Col>

        <Col xs={12} md>
          <button
            type="button"
            className="add-to-cart-btn "
            onClick={() => console.log("تم الضغط")}
          >
            <i className="fas fa-shopping-cart ms-2"></i>
            أضف إلى العربة
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductText;
