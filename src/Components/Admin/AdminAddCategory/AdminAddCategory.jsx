import { Row, Col, Form } from "react-bootstrap";
import avatarPlaceholder from "../../../Assets/Images/avatar.png";
import "./AdminAddCategory.css";

const AdminAddCategory = () => {
  return (
    <div className="admin-add-category-wrapper">
      <div className="admin-content-title pb-4">إضافة تصنيف جديد</div>

      <Form>
        <Row className="justify-content-start">
          <Col sm="12" md="8">
            <div className="text-form pb-2 category-image-label">
              صورة التصنيف
            </div>

            <label htmlFor="upload-image-input" className="image-upload-area">
              <img
                src={avatarPlaceholder}
                alt="Category Preview"
                className="category-preview-image"
              />

              <input
                type="file"
                name="photo"
                id="upload-image-input"
                accept="image/*"
              />
            </label>

            <input
              type="text"
              className="input-form d-block mt-4 px-3 category-name-input"
              placeholder="اسم التصنيف"
            />
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="8" className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn-save-category">
              حفظ التعديلات
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminAddCategory;
