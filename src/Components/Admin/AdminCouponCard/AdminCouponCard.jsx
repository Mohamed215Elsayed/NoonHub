import { FiEdit, FiTrash2, FiCalendar, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { formatDate } from '../../Uitily/DatesFormat/formatDate';
import CouponCardHook from '../../../Hook/coupon/coupon-card-hook';
import './AdminCouponCard.css';

const AdminCouponCard = ({ coupon }) => {
  const { show, handleClose, handleShow, handleDelete, loading } =
    CouponCardHook(coupon._id);

  return (
    <div className="coupon-card-wrapper h-100">
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={!loading}
        dialogClassName="animate-modal"
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-between align-items-center"
        >
          <Modal.Title className="fw-bold fs-5">تأكيد الحذف</Modal.Title>
          <button className="custom-close-btn" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </Modal.Header>
        <Modal.Body className="text-center">
          هل أنت متأكد من حذف الكوبون <br />
          <b className="text-danger">{coupon.name}</b>؟
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={loading}
          >
            تراجع
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                جاري الحذف...
              </>
            ) : (
              'تأكيد الحذف'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="coupon-card shadow-sm h-100 position-relative">
        <div className="coupon-cut cut-left"></div>
        <div className="coupon-cut cut-right"></div>

        <div className="coupon-inner-content p-4 d-flex flex-column justify-content-between h-100">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="coupon-badge-name" title={coupon.name}>
                {coupon.name}
              </div>

              <div className="d-flex gap-2">
                <Link
                  to={`/admin/editcoupon/${coupon._id}`}
                  className="icon-btn edit-btn shadow-sm"
                  title="تعديل"
                >
                  <FiEdit size={16} />
                </Link>
                <button
                  className="icon-btn delete-btn shadow-sm"
                  onClick={handleShow}
                  title="حذف"
                  disabled={loading}
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 text-muted">
              <div className="calendar-icon-wrapper shadow-sm">
                <FiCalendar size={14} />
              </div>
              <small className="fw-bold">
                ينتهي: {formatDate(coupon.expire)}
              </small>
            </div>
          </div>

          <div className="text-center border-top pt-3 mt-3">
            <div className="discount-value">
              <span className="amount">{coupon.discount}%</span>
              <span className="label">خصم الكوبون</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponCard;
