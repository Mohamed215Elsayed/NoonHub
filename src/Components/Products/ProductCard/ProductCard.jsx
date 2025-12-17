import { useState } from "react";
import { Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaShoppingCart,
} from "react-icons/fa";
import "./ProductCard.css";
import prod1 from "../../../Assets/Images/camera.jpg";

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    id = 1,
    title = "سود كربون ساعة يد ذكية بيب إس أسود",
    price = 880,
    oldPrice = 1200,
    rating = 4.5,
    reviews = 132,
    image = prod1, 
    discount = true,
  } = product || {};

  // حساب نسبة الخصم
  const discountPercentage = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <Col xs={6} sm={6} md={4} lg={3} className="product-col">
      <Card className="product-card h-100 position-relative overflow-hidden">
        <Link to={`/products/${id}`} className="card-link">
          <div className="img-wrapper">
            <Card.Img variant="top" src={image} className="product-img" />

            {discount && discountPercentage > 0 && (
              <Badge className="discount-badge">
                خصم {discountPercentage}%
              </Badge>
            )}
          </div>
        </Link>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="favorite-btn"
        >
          {isFavorite ? (
            <FaHeart className="text-danger" />
          ) : (
            <FaRegHeart className="text-muted-heart" />
          )}
        </button>

        <Card.Body className="d-flex flex-column p-3">
          <Card.Title className="product-title">{title}</Card.Title>

          <div className="rating mb-2 mt-auto">
            <div className="stars d-flex gap-1">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(rating) ? (
                  <FaStar key={i} className="star-icon text-warning" />
                ) : (
                  <FaRegStar key={i} className="star-icon text-muted-star" />
                )
              )}
            </div>
            <span className="reviews-count">({reviews})</span>
          </div>

          {/* Price */}
          <div className="price-container">
            <div className="d-flex align-items-baseline gap-2">
              <span className="current-price">{price}</span>
              <span className="currency">ج.م</span>{" "}
              {oldPrice && oldPrice > price && (
                <span className="old-price">{oldPrice} ج.م</span>
              )}
            </div>
          </div>

          <button className="action-btn cart-action-btn">
            <FaShoppingCart className="me-2" />
            أضف للعربة
          </button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
