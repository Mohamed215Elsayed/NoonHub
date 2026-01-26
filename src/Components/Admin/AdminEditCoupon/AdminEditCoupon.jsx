import './AdminEditCoupon.css';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import EditCouponHook from '../../../Hook/coupon/edit-coupon-hook';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hook/auth/protected-route-hook';

const AdminEditCoupon = () => {
  const { id } = useParams();

  const {
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    isSubmitting,
  } = EditCouponHook(id);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  if (!isAdmin)
    return <div className="alert alert-danger">غير مسموح لك بالدخول هنا</div>;

  return (
    <div className="admin-add-coupon-container">
      <Row className="justify-content-start">
        <div className="admin-content-title pb-2">تعديل بيانات الكوبون</div>
        <p className="text-muted mb-4">
          تعديل معلومات الكوبون:{' '}
          <span className="text-primary">{couponName}</span>
        </p>

        <Col
          sm="8"
          className="coupon-form-box p-4 shadow-sm border rounded bg-white"
        >
          <Form.Group>
            <Form.Label htmlFor="coupon-name" className="fw-bold">
              اسم الكوبون
            </Form.Label>
            <input
              id="coupon-name"
              name="couponName"
              value={couponName}
              onChange={onChangeName}
              type="text"
              className="input-form d-block px-3 w-100"
              placeholder="اسم الكوبون"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="coupon-date" className="fw-bold">
              تاريخ الانتهاء
            </Form.Label>
            <input
              type="date"
              id="coupon-date"
              name="couponDate"
              className="input-form d-block px-3 w-100"
              onChange={onChangeDate}
              value={couponDate}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="coupon-value" className="fw-bold">
              نسبة الخصم (%)
            </Form.Label>
            <input
              id="coupon-value"
              name="couponValue"
              value={couponValue}
              onChange={onChangeValue}
              type="number"
              className="input-form d-block px-3 w-100"
              placeholder="نسبة خصم الكوبون"
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn-cancel px-4"
              onClick={() => navigate('/admin/addcoupon')}
              type="button"
            >
              إلغاء
            </button>
            <button
              onClick={onSubmit}
              className="btn-save px-5 d-flex align-items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'حفظ التعديلات'
              )}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminEditCoupon;
