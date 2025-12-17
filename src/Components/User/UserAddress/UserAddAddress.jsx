import { Row, Col, Form } from "react-bootstrap";
import "./UserAddAddress.css";

const UserAddAddress = () => {
  return (
    <Form className="user-add-address-container">
      <Row className="justify-content-start">
        <div className="content-title pb-4">إضافة عنوان جديد</div>

        <Col sm="12" md="10">
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="تسمية العنوان (مثلاً: المنزل - العمل)"
          />

          <textarea
            className="input-form input-form-area p-3 mt-3"
            rows="4"
            placeholder="العنوان بالتفصيل (الشارع، رقم المبنى، إلخ.)"
          />

          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="رقم الهاتف"
          />
        </Col>
      </Row>

      <Row>
        <Col sm="12" md="10" className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn-save-address">
            حفظ العنوان
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserAddAddress;
