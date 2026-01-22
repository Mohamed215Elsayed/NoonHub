import "./ProductText.css"
import { Row, Col, Spinner } from "react-bootstrap"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ViewProductsDetalisHook from "../../../Hook/product/view-products-detalis-hook"
import useAddToCartHook from "../../../Hook/cart/add-to-cart-hook"

const ProductText = () => {
  const { id } = useParams()
  const { item, cat, brand } = ViewProductsDetalisHook(id)
  const [showMore, setShowMore] = useState(false)

  const {
    colorClick,
    indexColor,
    addToCartHandle,
    loading,
  } = useAddToCartHook(id, item)

  return (
    <div className="product-text-section">
      {/* Category */}
      <Row className="mb-2">
        <Col>
          <span className="product-category">
            {cat?.name || "تصنيف عام"}
          </span>
        </Col>
      </Row>

      {/* Title & Rating */}
      <Row className="mb-3">
        <Col lg={10}>
          <h1 className="product-title d-flex flex-wrap align-items-center gap-3">
            {item?.title}
            <span className="product-rating">
              <i className="fas fa-star"></i> {item?.ratingsAverage || 0}
            </span>
          </h1>
        </Col>
      </Row>

      {/* Brand */}
      <Row className="mb-3">
        <Col lg={10}>
          <span className="product-brand-label">الماركة :</span>
          <span className="product-brand-name">
            {brand?.name || "غير محددة"}
          </span>
        </Col>
      </Row>

      {/* Colors */}
      {item?.colors?.length > 0 && (
        <Row className="mb-4">
          <Col lg={10}>
            <div className="color-options">
              {item.colors.map((color, index) => (
                <span
                  key={index}
                  className="color-swatch"
                  onClick={() => colorClick(index, color)}
                  style={{
                    backgroundColor: color,
                    border: indexColor === index ? "3px solid #000" : "1px solid #ddd",
                    outline: indexColor === index ? "2px solid white" : "none",
                  }}
                />
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* Description */}
      <Row className="mb-2">
        <Col>
          <span className="product-specs-title">المواصفات :</span>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={12}>
          <p className={`product-description ${showMore ? "expanded" : ""}`}>
            {item?.description}
          </p>

          {item?.description?.length > 100 && (
            <span
              className="read-more"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "عرض أقل" : "عرض المزيد"}
            </span>
          )}
        </Col>
      </Row>

      {/* Price & Add To Cart */}
      <Row className="align-items-center g-3">
        <Col xs={12} md="auto">
          <div className="product-price">
            {item?.price
              ? `${item.price.toLocaleString()} جنيه`
              : ""}
          </div>
        </Col>

        <Col xs={12} md>
          <button
            type="button"
            className="add-to-cart-btn"
            disabled={loading || !item?._id}
            onClick={addToCartHandle}
            style={{ minWidth: "150px" }}
          >
            {loading ? (
              <Spinner animation="border" size="sm" variant="light" className="ms-2" />
            ) : (
              <i className="fas fa-shopping-cart ms-2" />
            )}
            {loading ? 'جاري الإضافة...' : 'أضف إلى العربة'}
          </button>
        </Col>

      </Row>
    </div>
  )
}

export default ProductText
