import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteCartHook from '../../Hook/cart/delete-cart-hook';
import './CartCheckout.css';
import ApplayCouponHook from '../../Hook/cart/applay-coupon-hook';

function CartCheckout({ totalCartPrice, totalPriceAfterDiscount }) {
  const { handleDeleteCart } = DeleteCartHook();
  const { couponName, onChangeCoupon, handleSubmitCoupon } = ApplayCouponHook();

  const hasDiscount = totalPriceAfterDiscount > 0;

  return (
    <Row className="cart-checkout my-1 justify-content-center pt-3">
      <Col xs={12} className="d-flex flex-column gap-2">
        <div className="coupon-wrapper">
          <input
            className="coupon-input"
            placeholder="كود الخصم"
            aria-label="coupon-code"
            value={couponName}
            onChange={onChangeCoupon}
          />
          <button className="coupon-btn" onClick={handleSubmitCoupon}>
            تطبيق
          </button>
        </div>

        <div className="total-price-container">
          {hasDiscount ? (
            <>
              <span className="old-price">{totalCartPrice} جنية</span>
              <span className="final-price">
                {totalPriceAfterDiscount} جنية
              </span>
            </>
          ) : (
            <span className="final-price">{totalCartPrice} جنية</span>
          )}
        </div>

        <Link
          to="/order/paymethoud"
          className="checkout-btn text-decoration-none"
        >
          اتمام الشراء
        </Link>

        <button onClick={handleDeleteCart} className="clear-cart-btn">
          مسح العربة
        </button>
      </Col>
    </Row>
  );
}

export default CartCheckout;
