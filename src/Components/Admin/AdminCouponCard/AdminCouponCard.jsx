import { FiEdit, FiTrash2, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./AdminCouponCard.css";
import { formatDate } from "../../Uitily/DatesFormat/formatDate";
import CouponCardHook from "../../../Hook/coupon/coupon-card-hook";
import { Button, Modal, Spinner } from "react-bootstrap";

const AdminCouponCard = ({ coupon }) => {
  const { show, handleClose, handleShow, handleDelete, loading } =
    CouponCardHook(coupon._id);
  return (
    <div className="coupon-card p-3 shadow-sm h-100 d-flex flex-column justify-content-between">
      {/* Delete Confirmation Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={!loading}
        dialogClassName="animate-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">تأكيد الحذف</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          هل أنت متأكد من حذف الكوبون
          <br />
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
              "تأكيد الحذف"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="coupon-badge-name">{coupon.name}</div>

          <div className="d-flex gap-1">
            <Link
              to={`/admin/editcoupon/${coupon._id}`}
              className="icon-btn edit-btn"
              title="تعديل"
            >
              <FiEdit size={18} />
            </Link>

            <button
              className="icon-btn delete-btn"
              onClick={handleShow}
              title="حذف"
              disabled={loading}
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 text-secondary mb-2">
          <div className="calendar-icon-wrapper">
            <FiCalendar size={14} />
          </div>
          <span style={{ fontSize: "13px", fontWeight: "500" }}>
            ينتهي: {formatDate(coupon.expire)}
          </span>
        </div>
      </div>

      <div className="mt-3 text-center border-top pt-3">
        <div className="discount-value">
          <span className="amount">{coupon.discount}%</span>
          <span className="label">خصم الكوبون</span>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponCard;
