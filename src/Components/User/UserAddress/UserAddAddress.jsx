import { Row, Col, Form } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHome,
  FaPlusCircle,
  FaCity,
  FaHashtag,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "./UserAddAddress.css";
import AddAddressHook from "../../../Hook/user/add-address-hook";

const UserAddAddress = () => {
  const {
    alias,
    details,
    phone,
    city,
    postalCode,
    handleChange,
    onSubmit,
    loading,
  } = AddAddressHook();

  return (
    <div className="address-page-wrapper">
      <Form
        className="user-add-address-card shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="header-section text-center mb-5 animate-fade-down">
          <div className="icon-circle">
            <FaPlusCircle />
          </div>
          <h4 className="content-title mt-3">إضافة عنوان جديد</h4>
          <p className="text-muted small">
            يرجى ملء البيانات بدقة لضمان وصول الطلبات إليك
          </p>
        </div>

        <Row className="gy-4">
          <Col md={12} className="animate-slide-in">
            <div className="custom-floating-group">
              <FaHome className="field-icon" />
              <input
                name="alias"
                value={alias}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="تسمية العنوان (المنزل، العمل...)"
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
                value={details}
                onChange={handleChange}
                className="modern-input modern-textarea"
                rows="3"
                placeholder="العنوان بالتفصيل (الشارع، البناية، الشقة)"
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
                value={phone}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="رقم الجوال (مصر أو السعودية)"
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
                value={city}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="المدينة"
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
                value={postalCode}
                onChange={handleChange}
                type="text"
                className="modern-input"
                placeholder="الرمز البريدي"
              />
            </div>
          </Col>
        </Row>

        <div className="action-area mt-5 text-center">
          <button
            onClick={onSubmit}
            disabled={loading}
            className={`btn-save-modern ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <span className="loader-dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              "حفظ العنوان الجديد"
            )}
          </button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default UserAddAddress;
