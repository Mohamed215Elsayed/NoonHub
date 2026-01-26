import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ img, name, id }) => {
  return (
    <Col xs={6} sm={6} md={4} lg={2} className="px-2 mb-4">
      <Link
        to={`/products/category/${id}`}
        className="modern-cat-card d-block text-decoration-none"
      >
        <div className="modern-cat-img-wrapper">
          <img src={img} alt={name} className="modern-cat-img" />
          <div className="modern-cat-overlay d-flex align-items-center justify-content-center">
            <span className="view-text">عرض المنتجات</span>
          </div>
        </div>

        <h5 className="modern-cat-title">{name}</h5>
      </Link>
    </Col>
  );
};

export default CategoryCard;
