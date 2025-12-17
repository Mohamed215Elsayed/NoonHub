import React from "react";
import { Row, Col } from "react-bootstrap";
import CartItem from "../../Cart/CartItem";
import "./AdminOrderDetails.css";

const AdminOrderDetalis = () => {
  return (
    <div className="order-details-wrapper">
      <div className="admin-content-text">تفاصيل الطلب رقم #55</div>

      <div className="products-list">
        <CartItem />
        <CartItem />
        <CartItem />
      </div>

      <div className="client-details-card mt-4">
        <div className="admin-content-text py-2 client-header">
          تفاصيل العميل
        </div>

        <div className="detail-item">
          <span className="detail-label">الاسم:</span>
          <span className="detail-value">محمد السيد</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">رقم الهاتف:</span>
          <span className="detail-value" dir="ltr">
            01027305928
          </span>
        </div>

        <div className="detail-item mb-4">
          <span className="detail-label">الايميل:</span>
          <span className="detail-value">mohamed344@gmail.com</span>
        </div>
      </div>

      <Row className="justify-content-center mt-4">
        <Col xs="12">
          <div className="order-summary-box d-inline-block px-4 pt-2">
            المجموع <span className="final-price">٤٠٠٠ جنيه</span>
          </div>
        </Col>

        <Col xs="12" className="mt-3">
          <div className="d-flex justify-content-center align-items-center order-status-control">
            <select
              name="order-status"
              id="order-status-select"
              className="select-status-input mt-1 text-center px-2 w-50"
            >
              <option value="">حالة الطلب</option>
              <option value="pending">قيد التنفيذ</option>
              <option value="completed">تم الانتهاء</option>
              <option value="cancelled">الغاء</option>
            </select>

            <button className="btn-update-status px-3 d-inline mx-2">
              حفظ الحالة
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminOrderDetalis;
