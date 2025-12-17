import "./ChoosePayMethoud.css";
import { Row, Col } from "react-bootstrap";

const ChoosePayMethoud = () => {
  return (
    <div>
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>

      <div className="payment-methods-card my-3">
        <Row className="mb-3">
          <Col xs="12">
            <label className="payment-option" htmlFor="creditCard">
              <input
                name="paymentGroup"
                id="creditCard"
                type="radio"
                value="الدفع عن طريق البطاقه الائتمانية"
              />
              <span className="custom-radio"></span>
              <span className="payment-option-label">
                الدفع عن طريق البطاقه الائتمانية
              </span>
            </label>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <label className="payment-option" htmlFor="cashOnDelivery">
              <input
                name="paymentGroup"
                id="cashOnDelivery"
                type="radio"
                value="الدفع عند الاستلام"
              />
              <span className="custom-radio"></span>
              <span className="payment-option-label">الدفع عند الاستلام</span>
            </label>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12">
          <div className="checkout-footer">
            <div className="complete-purchase-btn"> اتمام الشراء</div>
            <div className="total-price">34000 جنية</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChoosePayMethoud;
