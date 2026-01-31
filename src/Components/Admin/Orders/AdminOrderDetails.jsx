import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  FaUserAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWallet,
  FaShippingFast,
  FaCalendarAlt,
} from 'react-icons/fa';
import GetOrderDetailsHook from '../../../Hook/admin/get-order-detalis-hook';
import ChangeOrderStatusHook from '../../../Hook/admin/change-order-status-hook';
import CartItem from '../../Cart/CartItem';
import './AdminOrderDetails.css';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const { orderData, cartItems } = GetOrderDetailsHook(id);
  const {
    formatDate,
    onChangePayValue,
    onChangeDeliverValue,
    payValue,
    deliverValue,
    changePayOrder,
    changeDeliverOrder,
    loadingChange,
  } = ChangeOrderStatusHook(id);

  return (
    <div className="order-details-wrapper p-3">
      <div className="order-header d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h4 className="fw-bold mb-0">
          تفاصيل الطلب{' '}
          <span className="text-primary">
            #{orderData?._id?.slice(-8).toUpperCase()}
          </span>
        </h4>
        <div className="order-date-badge">
          <FaCalendarAlt className=" mx-1" />
          {formatDate(orderData?.createdAt)}
        </div>
      </div>

      <div className="products-section mb-5">
        <h5 className="section-title mb-3">
          <FaShippingFast className=" text-primary" />
          المنتجات ({cartItems?.length || 0})
        </h5>
        <div className="products-list-container">
          {cartItems?.map((item, i) => (
            <CartItem key={i || item._id} item={item} />
          ))}
        </div>
      </div>

      <Row className="gy-4">
        <Col lg={7}>
          <Card className="info-card h-100">
            <Card.Header>
              <FaUserAlt className="me-2 text-primary" />
              معلومات العميل
            </Card.Header>
            <Card.Body>
              <div className="info-row">
                <span>
                  <FaUserAlt /> الاسم
                </span>
                <strong>{orderData?.user?.name || '---'}</strong>
              </div>
              <div className="info-row">
                <span>
                  <FaPhoneAlt /> الهاتف
                </span>
                <strong dir="ltr">{orderData?.user?.phone || '---'}</strong>
              </div>
              <div className="info-row">
                <span>
                  <FaEnvelope /> الإيميل
                </span>
                <strong>{orderData?.user?.email || '---'}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="info-card h-100">
            <Card.Header>
              <FaWallet className="me-2 text-success" />
              تحديث الحالة
            </Card.Header>
            <Card.Body>
              <div className="action-block">
                <label>
                  حالة الدفع:{' '}
                  <strong>{orderData?.isPaid ? 'تم' : 'لم يتم'}</strong>
                </label>
                <div className="d-flex gap-2 ">
                  <div className="form-select-wrapper">
                    <Form.Select onChange={onChangePayValue} value={payValue}>
                      <option value="">اختر</option>
                      <option value="true">تم الدفع</option>
                    </Form.Select>
                  </div>

                  <Button
                    variant="success"
                    disabled={loadingChange}
                    onClick={() => changePayOrder(payValue)}
                  >
                    {loadingChange ? 'جاري...' : 'حفظ'}
                  </Button>
                </div>
              </div>

              <div className="action-block">
                <label>
                  حالة التوصيل:{' '}
                  <strong>
                    {orderData?.isDelivered ? 'تم' : 'قيد التنفيذ'}
                  </strong>
                </label>
                <div className="d-flex gap-2">
                  <div className="form-select-wrapper">
                    <Form.Select
                      onChange={onChangeDeliverValue}
                      value={deliverValue}
                    >
                      <option value="">اختر</option>
                      <option value="true">تم التوصيل</option>
                    </Form.Select>
                  </div>

                  <Button
                    variant="primary"
                    disabled={loadingChange}
                    onClick={() => changeDeliverOrder(deliverValue)}
                  >
                    {loadingChange ? 'جاري...' : 'حفظ'}
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="total-order-bar mt-5">
        <span>إجمالي الطلب</span>
        <span className="final-price">
          {orderData?.totalOrderPrice
            ? orderData?.totalOrderPrice.toLocaleString('ar-EG')
            : '—'}{' '}
          جنيه
        </span>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
