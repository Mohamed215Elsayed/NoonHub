import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import mobile from "../../../Assets/Images/mobile.png";
import "./AdminAllOrders.css";

function AdminAllOrdersItem() {
  return (
    <Col sm="12">
      <div className="order-item-card my-2">
        <Link
          to="/admin/orders/23"
          className="cart-item-body my-2 px-1 d-flex"
          style={{ textDecoration: "none" }}
        >
          <img src={mobile} alt="order-img" />
          <div className="w-100">
            <Row className="justify-content-between">
              <Col sm="12" className="d-flex justify-content-between">
                <div className="order-header-info">طلب رقم #2321</div>
                <div className="order-remove-btn d-flex align-items-center">
                  <FaTrashAlt className="me-1" />
                  <span>ازاله</span>
                </div>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col
                sm="12"
                className="d-flex justify-content-start align-items-baseline"
              >
                <div className="product-order-title ">
                  آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق
                  فيس تايم (برودكت) أحمر
                </div>
                <div className="d-flex align-items-center ms-auto">
                  <FaStar className="star-icon" />
                  <div className="product-order-rate">4.5</div>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col sm="12" className="d-flex align-items-center">
                <div className="detail-label">الماركة :</div>
                <div className="detail-value ">ابل</div>
                <div
                  className="product-color-swatch"
                  style={{ backgroundColor: "#E52C2C" }}
                ></div>
              </Col>
            </Row> */}
            <Row>
              <Col
                sm="12"
                className="d-flex align-items-center product-specs-row"
              >
                <div className="detail-label">الماركة :</div>
                <div className="detail-value brand-value">ابل</div>
                <div className="separator mx-3">|</div>
                <div className="detail-label">اللون:</div>
                <div
                  className="product-color-swatch"
                  style={{ backgroundColor: "#E52C2C" }}
                ></div>
              </Col>
            </Row>

            <Row className="justify-content-between mt-3">
              <Col
                sm="12"
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <div className="order-quantity-label">الكميه</div>
                  <input
                    className="mx-2 order-quantity-input"
                    type="number"
                    defaultValue="1"
                  />
                </div>
                <div className="order-final-price">٣٠٠٠ جنية</div>
              </Col>
            </Row>
          </div>
        </Link>
      </div>
    </Col>
  );
}

export default AdminAllOrdersItem;
