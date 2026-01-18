import { Row, Col, Modal } from "react-bootstrap";
import {
  FaTrashAlt,
  FaEdit,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaMapSigns,
  FaCity,
  FaHashtag,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./UserAddressCard.css";
import DeleteAddressHook from "../../../Hook/user/delete-address-hook";
const UserAddressCard = ({ item }) => {
  const { show, handleClose, handleShow, handleDelete, loading } =
    DeleteAddressHook(item._id);

  return (
    <div className="address-card-master animate-on-load my-4">
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="custom-delete-modal"
      >
        <Modal.Body className="p-5 text-center">
          <div className="warning-animated-icon">
            <FaExclamationTriangle />
          </div>
          <h4 className="modal-title-custom">تأكيد الحذف</h4>
          <p className="modal-text-custom">
            هل تريد حقاً إزالة عنوان "{item.alias}"؟
          </p>
          <div className="modal-action-btns mt-4">
            <button
              className="btn-cancel-modal"
              onClick={handleClose}
              disabled={loading}
            >
              تراجع
            </button>
            <button
              className="btn-confirm-delete"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  جاري الحذف...
                </>
              ) : (
                "تأكيد الحذف"
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="card-glass-effect p-4">
        <Row className="align-items-center mb-3">
          <Col xs="7">
            <div className="badge-wrapper">
              <div className="modern-badge">
                <FaMapSigns className="badge-icon" />
                <span title={item.alias}>{item.alias}</span>
              </div>
            </div>
          </Col>

          <Col xs="5" className="d-flex justify-content-end">
            <div className="control-pills">
              <Link
                to={`/user/edit-address/${item._id}`}
                className="pill-link edit-pill"
              >
                <FaEdit />
              </Link>
              <button onClick={handleShow} className="pill-link delete-pill">
                <FaTrashAlt />
              </button>
            </div>
          </Col>
        </Row>

        <div className="address-content-box">
          <div className="address-info-row">
            <div className="icon-box">
              <FaMapMarkerAlt />
            </div>
            <div className="text-box">
              <span className="label">موقع التسليم</span>
              <p className="value">{item.details}</p>
            </div>
          </div>

          <Row className="mt-3">
            <Col md={6}>
              <div className="custom-floating-group">
                <FaCity className="field-icon" />
                <input
                  type="text"
                  className="modern-input"
                  value={item.city || ""}
                  readOnly
                  placeholder="المدينة"
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="custom-floating-group">
                <FaHashtag className="field-icon" />
                <input
                  type="text"
                  className="modern-input"
                  value={item.postalCode || ""}
                  readOnly
                  placeholder="الرمز البريدي"
                />
              </div>
            </Col>
          </Row>

          <div className="address-info-row mt-3">
            <div className="icon-box phone-bg">
              <FaPhoneAlt />
            </div>
            <div className="text-box">
              <span className="label">رقم التواصل</span>
              <p className="value-phone">{item.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddressCard;
