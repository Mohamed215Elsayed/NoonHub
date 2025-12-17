import { Row, Col, Form } from "react-bootstrap";
import { FaEdit, FaCamera } from "react-icons/fa";
import coverPlaceholder from "../../../Assets/Images/cover-placeholder.jpg";
import avatarPlaceholder from "../../../Assets/Images/avatar.png";
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="user-profile-wrapper">
      <div className="content-title pb-4">الصفحة الشخصية</div>

      <div className="profile-header">
        <div className="cover-photo-container">
          <img src={coverPlaceholder} alt="Cover" className="cover-photo" />

          <label htmlFor="upload-cover-input" className="edit-cover-btn">
            <FaCamera />
            <input type="file" id="upload-cover-input" accept="image/*" />
          </label>
        </div>

        <div className="avatar-container">
          <img
            src={avatarPlaceholder}
            alt="Avatar"
            className="profile-avatar"
          />

          <label htmlFor="upload-avatar-input" className="edit-avatar-btn">
            <FaCamera />
            <input type="file" id="upload-avatar-input" accept="image/*" />
          </label>
        </div>
      </div>

      <div className="user-info-card my-5 p-3">
        <Row className="info-row">
          <Col xs="12" sm="6" className="d-flex info-item">
            <div className="info-label">الاسم:</div>
            <div className="info-value">محمد السيد</div>
          </Col>
          <Col xs="12" sm="6" className="d-flex info-item">
            <div className="info-label">رقم الهاتف:</div>
            <div className="info-value">01027305928</div>
          </Col>
        </Row>

        <Row className="info-row">
          <Col xs="12" className="d-flex info-item">
            <div className="info-label">البريد الإلكتروني:</div>
            <div className="info-value">moeid2152000@gmail.com</div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="12" className="d-flex justify-content-end">
            <button className="btn-edit-info">
              <FaEdit className="ms-2" /> تعديل المعلومات الشخصية
            </button>
          </Col>
        </Row>
      </div>

      <Form className="password-change-section mt-5">
        <div className="content-title pb-3 small-title">تغيير كلمة المرور</div>

        <Row className="justify-content-start">
          <Col xs="12" sm="10" md="8" lg="6">
            <input
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder="ادخل كلمة المرور القديمة"
            />
            <input
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder="ادخل كلمة المرور الجديدة"
            />
          </Col>
        </Row>

        <Row>
          <Col
            xs="12"
            sm="10"
            md="8"
            lg="6"
            className="d-flex justify-content-end "
          >
            <button type="submit" className="btn-save-password mt-3">
              حفظ كلمة السر
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserProfile;
