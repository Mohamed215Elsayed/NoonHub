import { Col, Modal, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import './AdminAllOrdersItem.css';
import useDeleteOrder from '../../../Hook/admin/DeleteOrderHook';

function AdminAllOrdersItem({ order }) {
  const orderImage = order?.cartItems?.[0]?.product?.imageCover;
  const {
    show,
    // handleShow,
    handleClose,
    handleDelete,
    loading,
    handleShowModal,
  } = useDeleteOrder(order?._id);
  return (
    <Col xs="12">
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">تأكيد الحذف</Modal.Title>
          <button className="custom-close-btn" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          هل أنت متأكد من حذف الطلب رقم <br />
          <span className="text-danger fw-bold">#{order?._id}</span>؟
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            تراجع
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'تأكيد الحذف'}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="order-item-card">
        <Link to={`/admin/orders/${order?._id}`} className="cart-item-body">
          <div className="order-img-container">
            <img src={orderImage} alt="order" />
          </div>

          <div className="order-content">
            <div className="order-header">
              <span className="order-id">
                طلب رقم #{order?._id?.slice(-6).toUpperCase()}
              </span>

              <button className="order-remove-btn" onClick={handleShowModal}>
                <FaTrashAlt /> إزالة
              </button>
            </div>

            <div className="customer-info">
              <div className="info-item">
                <FaUser />
                <span>{order?.user?.name}</span>
              </div>
              <div className="info-item email">
                <FaEnvelope />
                <span>{order?.user?.email}</span>
              </div>
            </div>

            <div className="order-footer">
              <div className="status-container">
                <span className="stat-badge">
                  التوصيل:
                  <b className={order?.isDelivered ? 'success' : 'warning'}>
                    ● {order?.isDelivered ? 'تم' : 'قيد التنفيذ'}
                  </b>
                </span>

                <span className="stat-badge">
                  الدفع:
                  <b className={order?.isPaid ? 'success' : 'danger'}>
                    ● {order?.isPaid ? 'تم' : 'معلق'}
                  </b>
                </span>

                <span className="stat-badge">
                  الوسيلة:
                  <b className="primary">
                    {order?.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة'}
                  </b>
                </span>
              </div>

              <div className="order-final-price-box">
                {order?.totalOrderPrice?.toLocaleString()} جنيه
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Col>
  );
}

export default AdminAllOrdersItem;
