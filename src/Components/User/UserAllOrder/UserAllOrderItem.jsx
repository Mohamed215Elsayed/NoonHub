import { Row, Col } from "react-bootstrap";
import UserAllOrderCard from "./UserAllOrderCard";
import './UserAllOrderItem.css'; 

function UserAllOrderItem({ order }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="user-order mt-3 mb-4 shadow-sm bg-white">
      <div className="order-title d-flex justify-content-between align-items-center">
        <span>
          طلب رقم{' '}
          <span className="text-primary">
            #{order._id?.slice(-6).toUpperCase()}
          </span>
        </span>
        <span className="text-muted fw-normal">
          بتاريخ: {formatDate(order.createdAt)}
        </span>
      </div>

      <div className="p-3">
        {order?.cartItems?.length > 0 ? (
          order.cartItems.map((item) => (
            <UserAllOrderCard key={item._id} item={item} />
          ))
        ) : (
          <p className="text-center my-4 text-muted">
            لا توجد منتجات في هذا الطلب
          </p>
        )}

        <Row className="d-flex justify-content-between align-items-end mt-3 pt-3 border-top">
          <Col xs="12" md="8">
            <div className="info-row">
              <span className="text-muted" style={{ width: '100px' }}>
                التوصيل:
              </span>
              <span
                className={`stat ${order.isDelivered ? 'text-success' : 'text-danger'}`}
              >
                {order.isDelivered ? 'تم التوصيل' : 'قيد التنفيذ'}
              </span>
            </div>

            <div className="info-row">
              <span className="text-muted" style={{ width: '100px' }}>
                الدفع:
              </span>
              <span
                className={`stat ${order.isPaid ? 'text-success' : 'text-danger'}`}
              >
                {order.isPaid ? 'تم الدفع' : 'لم يتم الدفع'}
              </span>
            </div>

            <div className="info-row">
              <span className="text-muted" style={{ width: '100px' }}>
                الوسيلة:
              </span>
              <span className="stat text-primary">
                {order.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة ائتمانية'}
              </span>
            </div>
          </Col>

          <Col xs="12" md="4" className="text-md-end mt-3 mt-md-0">
            <div className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>
              إجمالي الحساب
            </div>
            <div className="brand-text fw-bold fs-4">
              {order?.totalOrderPrice
                ? order.totalOrderPrice.toLocaleString('ar-EG')
                : '—'}{' '}
              <span style={{ fontSize: '0.9rem' }} className="currency">
                جنيه
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserAllOrderItem;