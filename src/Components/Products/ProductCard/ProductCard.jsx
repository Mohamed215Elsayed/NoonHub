import { Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaEye,
  FaStar,
} from "react-icons/fa";
import "./ProductCard.css";
import ProductCardHook from "../../../Hook/wishList/product-card-hook";

function ProductCard({ product }) {
  const { isFav, handleFav, loading } = ProductCardHook(product);
  const rating = product?.ratingsAverage || 0;
  const reviews = product?.ratingsQuantity || 0;
  const currentPrice = product?.priceAfterDiscount || product?.price;
  const oldPrice = product?.priceAfterDiscount ? product?.price : null;
  const discountPercentage = oldPrice
    ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
    : 0;

  return (
    <Col xs={6} sm={6} md={4} lg={3} className="mb-4">
      <div className="modern-product-card">
        <div className="card-image-wrapper">
          <Link to={`/products/${product?._id}`}>
            <img
              src={product?.imageCover}
              alt={product?.title}
              className="product-img-main"
            />
          </Link>
          {discountPercentage > 0 && discountPercentage < 100 && (
            <Badge className="modern-badge-discount">
              -{discountPercentage}%
            </Badge>
          )}
          <div className="hover-actions-bar">
            <button
              disabled={loading}
              className={`action-icon favorite ${isFav ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleFav();
              }}
            >
              {isFav ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button className="action-icon cart">
              <FaShoppingCart />
            </button>
            <Link to={`/products/${product?._id}`} className="action-icon view">
              <FaEye />
            </Link>
          </div>
        </div>

        <div className="card-content-wrapper">
          <div className="brand-name">
            {product?.brand?.name || "Premium Selection"}
          </div>

          <h3 className="product-title-text" title={product?.title}>
            {product?.title}
          </h3>

          <p className="product-short-description">{product?.description}</p>

          <div className="rating-info-row">
            <div className="stars-list">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(rating) ? "star-gold" : "star-muted"
                  }
                />
              ))}
            </div>
            <span className="reviews-label">
              {reviews > 0 ? `(${reviews} تقييم)` : "(لا يوجد تقييمات)"}
            </span>
          </div>

          <div className="price-display-row">
            <div className="current-price-tag">
              <span className="val">{currentPrice}</span>
              <span className="unit">ج.م</span>
            </div>
            {oldPrice && <span className="old-price-tag">{oldPrice} ج.م</span>}
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProductCard;
