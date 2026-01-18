import './UserProfile.css';

import {
  Col,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import {
  FaCamera,
  FaCheck,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTimes,
} from 'react-icons/fa';

import ProfileHook from '../../../Hook/user/profile-hook';

const UserProfile = () => {
  const {
    user, name, setName, email, setEmail, phone, setPhone,
    profilePreview, coverPreview, handleImageChange,
    oldPassword, setOldPassword, newPassword, setNewPassword,
    confirmPassword, setConfirmPassword, submitPassword,
    showOldPassword, setShowOldPassword,
    showNewPassword, setShowNewPassword,
    showConfirmPassword, setShowConfirmPassword,
    isEditing, setIsEditing, loadingAction,
    showModal, setShowModal, modalImg,
    handleUpdate, openImage, cancelEdit,
  } = ProfileHook();

  return (
    <div className="user-profile-wrapper">
      {/* نافذة معاينة الصور */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        centered size="lg" 
        className="image-preview-modal"
      >
        <Modal.Body className="p-0 bg-dark d-flex justify-content-center position-relative">
          <img 
            src={modalImg} 
            alt="Preview" 
            style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }} 
          />
          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>

      <div className="content-title pb-4">الصفحة الشخصية</div>

      {/* منطقة الغلاف والصورة الشخصية */}
      <div className="profile-header">
        <div className="cover-photo-container">
          <img
            src={coverPreview}
            alt="Cover"
            className="cover-photo"
            style={{ cursor: "zoom-in" }}
            onClick={() => openImage(coverPreview)}
          />
          <label htmlFor="upload-cover-input" className="edit-cover-btn">
            <FaCamera />
            <input
              type="file"
              id="upload-cover-input"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "cover")}
            />
          </label>
        </div>

        <div className="avatar-container">
          <img
            src={profilePreview}
            alt="Avatar"
            className="profile-avatar"
            style={{ cursor: "zoom-in" }}
            onClick={() => openImage(profilePreview)}
          />
          <label htmlFor="upload-avatar-input" className="edit-avatar-btn">
            <FaCamera />
            <input
              type="file"
              id="upload-avatar-input"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "profile")}
            />
          </label>
        </div>
      </div>

      {/* بطاقة معلومات المستخدم */}
      <div className="user-info-card my-5 p-3">
        <Row className="info-row align-items-center">
          <Col xs="12" sm="6" className="d-flex info-item">
            <div className="info-label">الاسم:</div>
            {isEditing ? (
              <input 
                type="text" 
                className="input-form-sm" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            ) : (
              <div className="info-value">{user?.name}</div>
            )}
          </Col>
          <Col xs="12" sm="6" className="d-flex info-item">
            <div className="info-label">الهاتف:</div>
            {isEditing ? (
              <input 
                type="text" 
                className="input-form-sm" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            ) : (
              <div className="info-value">{user?.phone || "لا يوجد رقم"}</div>
            )}
          </Col>
        </Row>
        <Row className="info-row align-items-center mt-3">
          <Col xs="12" className="d-flex info-item">
            <div className="info-label">البريد الإلكتروني:</div>
            {isEditing ? (
              <input
                type="email"
                className="input-form-sm w-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div className="info-value">{user?.email}</div>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col xs="12" className="d-flex justify-content-end gap-2">
            {isEditing ? (
              <>
                <button 
                  className="btn-save-info" 
                  onClick={handleUpdate} 
                  disabled={loadingAction}
                >
                  {loadingAction ? <Spinner animation="border" size="sm" /> : (
                    <> <FaCheck /> حفظ التعديلات </>
                  )}
                </button>
                <button className="btn-cancel-info" onClick={cancelEdit}>
                  <FaTimes /> إلغاء
                </button>
              </>
            ) : (
              <button className="btn-edit-info" onClick={() => setIsEditing(true)}>
                <FaEdit className="ms-2" /> تعديل البيانات الأساسية
              </button>
            )}
          </Col>
        </Row>
      </div>

      {/* قسم تغيير كلمة المرور */}
      <Form className="password-change-section mt-5" onSubmit={submitPassword}>
        <div className="content-title pb-3 small-title">
          <FaLock className="ms-2" size={18} /> تأمين الحساب (تغيير كلمة المرور)
        </div>

        <Row className="justify-content-start">
          <Col xs="12" sm="10" md="8" lg="6">
            
            {/* كلمة المرور القديمة */}
            <div className="password-field-container position-relative mt-3">
              <input
                type={showOldPassword ? "text" : "password"}
                className="input-form px-3"
                placeholder="كلمة المرور القديمة"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span 
                className="eye-icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOldPassword(!showOldPassword);
                }}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* كلمة المرور الجديدة */}
            <div className="password-field-container position-relative mt-3">
              <input
                type={showNewPassword ? "text" : "password"}
                className="input-form px-3"
                placeholder="كلمة المرور الجديدة"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span 
                className="eye-icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNewPassword(!showNewPassword);
                }}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="password-field-container position-relative mt-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-form px-3"
                placeholder="تأكيد كلمة المرور الجديدة"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span 
                className="eye-icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="10" md="8" lg="6" className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn-save-password">
              تحديث كلمة المرور
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserProfile;