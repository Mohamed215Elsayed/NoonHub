import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useRevealOnScroll from './useRevealOnScroll';
import './BrandCard.css';

const BrandCard = ({ img, name, id }) => {
  const revealRef = useRevealOnScroll();

  return (
    <Col xs={6} sm={4} md={3} lg={2} className="px-2 mb-4">
      <Link
        to={`/products/brand/${id}`}
        className="modern-brand-card d-block text-decoration-none reveal"
        ref={revealRef}
      >
        <div className="modern-brand-img-wrapper">
          <img src={img} alt={name} className="modern-brand-img" />
          <div className="modern-brand-overlay d-flex align-items-center justify-content-center">
            <span className="brand-view-text">تصفح الماركة</span>
          </div>
        </div>

        <h5 className="modern-brand-title">{name}</h5>
      </Link>
    </Col>
  );
};

export default BrandCard;
