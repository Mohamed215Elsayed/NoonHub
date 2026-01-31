import ViewAddressesHook from '../../Hook/user/view-addresses-hook';
import './ChoosePayMethoud.css';
import { Row, Col } from 'react-bootstrap';
import OrderPayCashHook from '../../Hook/checkout/order-pay-cash-hook';
import OrderPayCardHook from '../../Hook/checkout/order-pay-card-hook';
import notify from '../../Hook/useNotifaction';

const ChoosePayMethoud = () => {
  const { addresses } = ViewAddressesHook();
  const {
    handleChooseAddress,
    handleCreateOrderCash,
    loading,
    handlePayMethod,
    totalCartPrice,
    totalPriceAfterDiscount,
    addressDetails,
    payMethod,
  } = OrderPayCashHook(); //cash method
  // const { handleCreateOrderCard } = OrderPayCardHook(addressDetails); //card method
const { handleCreateOrderCard } = OrderPayCardHook();
  const handleFinalCheckout = () => {
    if (payMethod === 'cash') {
      handleCreateOrderCash();
    } else if (payMethod === 'card') {
      // handleCreateOrderCard();
      handleCreateOrderCard(addressDetails);
    } else {
      notify('من فضلك اختر طريقة دفع أولاً', 'warn');
    }
  };

  return (
    <div className="payment-container">
      <div className="admin-content-text pt-5">اختر طريقة الدفع</div>

      <div className="payment-methods-card my-3">
        <Row className="gy-3">
          <Col xs="12">
            <label className="payment-option" htmlFor="creditCard">
              <input
                name="paymentGroup"
                id="creditCard"
                type="radio"
                value="card"
                onChange={handlePayMethod}
              />
              <span className="custom-radio"></span>
              <div className="payment-info">
                <span className="payment-option-label">
                  الدفع عن طريق البطاقه الائتمانية
                </span>
                <small className="payment-description">
                  فيزا، ماستر كارد، وميزة
                </small>
              </div>
            </label>
          </Col>

          <Col xs="12">
            <label className="payment-option" htmlFor="cashOnDelivery">
              <input
                name="paymentGroup"
                id="cashOnDelivery"
                type="radio"
                value="cash"
                onChange={handlePayMethod}
              />
              <span className="custom-radio"></span>
              <div className="payment-info">
                <span className="payment-option-label">الدفع عند الاستلام</span>
                <small className="payment-description">
                  الدفع كاش عند وصول المندوب لباب البيت
                </small>
              </div>
            </label>
          </Col>
        </Row>
      </div>

      <Row className="mt-4">
        <Col xs="12" md="6">
          <div className="address-select-wrapper">
            <label className="select-label">عنوان الشحن</label>
            <select
              className="custom-select-box"
              onChange={handleChooseAddress}
            >
              <option value="0">-- اختر عنوان الشحن --</option>
              {addresses?.length ? (
                addresses.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.alias} - {item.details}
                  </option>
                ))
              ) : (
                <option value="0" disabled>
                  لا يوجد عناوين مسجلة
                </option>
              )}
            </select>
          </div>
        </Col>
      </Row>

      <div className="checkout-footer-container">
        <div className="total-box">
          <span className="total-label">إجمالي المطلوب:</span>

          <span className="total-amount">
            {totalPriceAfterDiscount > 0
              ? totalPriceAfterDiscount
              : totalCartPrice}{' '}
            ج.م
          </span>
        </div>
        <button
          className="complete-purchase-btn"
          onClick={handleFinalCheckout}
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            'إتمام عملية الشراء'
          )}
        </button>
      </div>
    </div>
  );
};

export default ChoosePayMethoud;
