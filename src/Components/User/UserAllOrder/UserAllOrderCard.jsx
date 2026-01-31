import { Row, Col } from 'react-bootstrap';
import './UserAllOrderCard.css';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const UserAllOrderCard = ({ item }) => {
  return (
    <div className="product-order-card mb-3 p-3">
      <Row className="align-items-center">
        <Col xs="4" sm="3" md="2" className="d-flex justify-content-center">
          <Link
            to={item?.product?._id ? `/products/${item.product._id}` : '#'}
            style={{ textDecoration: 'none' }}
          >
            <div className="img-container">
              <img
                className="order-item-img"
                src={item?.product?.imageCover}
                alt={item?.product?.title || 'صورة المنتج'}
                loading="lazy"
              />
            </div>
          </Link>
        </Col>

        <Col xs="8" sm="9" md="7">
          <div className="order-details-content">
            <Link
              to={item?.product?._id ? `/products/${item.product._id}` : '#'}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h6 className="order-item-title d-inline">
                {item?.product?.title}
              </h6>
            </Link>

            <div className="rating-row mt-1">
              <span className="cat-rate text-warning">
                <FaStar fontSize="12px" />
                {item?.product?.ratingsAverage || 0}
              </span>

              <span className="rate-count text-muted">
                ({item?.product?.ratingsQuantity || 0} تقييم)
              </span>
            </div>

            <div className="order-item-info mt-2">
              <span className="info-label">الماركة: </span>
              <span className="info-value brand-name">
                {item?.product?.brand?.name || 'بدون ماركة'}
              </span>
            </div>

            <div className="order-item-info d-flex align-items-center">
              <span className="info-label">اللون:</span>
              <div
                className="color-circle ms-2"
                title={item?.color ? 'لون المنتج' : 'بدون لون'}
                style={{ backgroundColor: item?.color || '#eee' }}
              ></div>
            </div>

            <div className="order-item-info d-flex align-items-center mt-2">
              <span className="info-label">الكمية: </span>
              <input
                readOnly
                value={item.quantity}
                className="mx-2 text-center d-flex align-items-center justify-content-center"
                type="number"
                style={{
                  width: '45px',
                  height: '25px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
        </Col>

        <Col xs="12" md="3" className="text-md-end mt-3 mt-md-0">
          <div className="order-item-price">
            {item?.price ? item.price.toLocaleString('ar-EG') : '—'}{' '}
            <span className="currency">جنيه</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllOrderCard;
