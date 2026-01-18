import { Row, Col, Form, Spinner } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHome,
  FaEdit,
  FaCity,
  FaHashtag,
} from "react-icons/fa";
import "./UserAddAddress.css";
import EditAddressHook from "../../../Hook/user/edit-address-hook";

const UserEditAddress = () => {
  const { formData, handleChange, onSubmit, loading } = EditAddressHook();

  if (loading && !formData.alias) {
    return (
      <div className="address-page-wrapper d-flex align-items-center justify-content-center">
        <Spinner animation="grow" variant="danger" />
        <h5 className="ms-3 mt-2">جاري جلب بيانات العنوان...</h5>
      </div>
    );
  }

  return (
    <div className="address-page-wrapper">
      <Form
        className="user-add-address-card shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* ===== Header ===== */}
        <div className="header-section text-center mb-5 animate-fade-down">
          <div className="icon-circle">
            <FaEdit />
          </div>
          <h4 className="content-title mt-3">تعديل العنوان</h4>
          <p className="text-muted small">
            يمكنك تحديث بيانات العنوان ثم حفظ التغييرات
          </p>
        </div>

        {/* ===== Form Fields ===== */}
        <Row className="gy-4">
          <Col md={12} className="animate-slide-in">
            <div className="custom-floating-group">
              <FaHome className="field-icon" />
              <input
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="تسمية العنوان"
                disabled={loading}
              />
            </div>
          </Col>

          <Col
            md={12}
            className="animate-slide-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="custom-floating-group">
              <FaMapMarkerAlt className="field-icon textarea-icon-fix" />
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="modern-input modern-textarea"
                rows="3"
                placeholder="العنوان بالتفصيل"
                disabled={loading}
              />
            </div>
          </Col>

          <Col
            md={12}
            className="animate-slide-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="custom-floating-group">
              <FaPhoneAlt className="field-icon" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="رقم الجوال"
                disabled={loading}
              />
            </div>
          </Col>

          <Col
            md={6}
            className="animate-slide-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="custom-floating-group">
              <FaCity className="field-icon" />
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="المدينة"
                disabled={loading}
              />
            </div>
          </Col>

          <Col
            md={6}
            className="animate-slide-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="custom-floating-group">
              <FaHashtag className="field-icon" />
              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="الرمز البريدي"
                disabled={loading}
              />
            </div>
          </Col>
        </Row>

        {/* ===== Submit Button ===== */}
        <div className="action-area mt-5 text-center">
          <button
            onClick={onSubmit}
            disabled={loading}
            className={`btn-save-modern ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "حفظ التعديلات"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserEditAddress;
