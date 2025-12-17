import avatar from "../../../Assets/Images/avatar.png";
import { Row, Col, Form } from "react-bootstrap";
import "./AdminAddBrand.css";

const AdminAddBrand = () => {
  return (
    <div className="admin-add-brand-wrapper">
      <div className="admin-content-title pb-4">إضافة ماركة جديدة</div>

      <Form>
        <Row className="justify-content-start">
          <Col sm="12" md="8">
            <div className="text-form pb-2 brand-image-label">صورة الماركة</div>

            <label htmlFor="upload-image-input" className="image-upload-area">
              <img
                src={avatar}
                alt="Brand Preview"
                className="brand-preview-image"
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
              className="input-form d-block mt-4 px-3 brand-name-input"
              placeholder="اسم الماركة"
            />
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="8" className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn-save-brand">
              حفظ الماركة
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminAddBrand;
