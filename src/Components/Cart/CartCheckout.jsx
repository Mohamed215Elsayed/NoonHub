import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function CartCheckout() {
  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            className="copon-input d-inline text-center "
            placeholder="كود الخصم"
          />
          <button className="copon-btn-btn d-inline ">تطبيق</button>
        </div>
        <div className="product-price d-inline w-100 my-3  border">
          34000 جنية
        </div>
        <Link
          to="/order/paymethoud"
          className="product-cart-add w-100 px-2 text-decoration-none"
        >
          اتمام الشراء
        </Link>
      </Col>
    </Row>
  );
}

export default CartCheckout;
