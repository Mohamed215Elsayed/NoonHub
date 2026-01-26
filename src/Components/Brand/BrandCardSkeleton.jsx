import { Col, Card } from 'react-bootstrap';
import './BrandCardSkeleton.css';

const BrandCardSkeleton = () => {
  return (
    <Col xs={6} sm={4} md={3} lg={2} className="px-2">
      <Card className="brand-card skeleton-card">
        <div className="skeleton-img" />
      </Card>
    </Col>
  );
};

export default BrandCardSkeleton;
