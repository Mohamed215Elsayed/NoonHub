import { Row, Col, Form, Spinner } from "react-bootstrap"; //{ useRef }
import AdminCouponCard from "../AdminCouponCard/AdminCouponCard";
import "./AdminAddCoupon.css";
import AddCouponHook from "../../../Hook/coupon/add-coupon-hook";

function AdminAddCoupon() {
  // const dateRef = useRef();
  const {
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    coupons,
    loading,
  } = AddCouponHook();
  return (
    <div className="admin-add-coupon-container">
      <Row className="justify-content-start">
        <div className="admin-content-title pb-2">إضافة كوبون جديد</div>
        <p className="text-muted mb-4">أنشئ خصومات لعملائك لزيادة المبيعات</p>

        <Col
          sm="8"
          className="coupon-form-box p-4 shadow-sm border rounded bg-white"
        >
          <Form.Group>
            <Form.Label className="fw-bold">اسم الكوبون</Form.Label>
            <input
              type="text"
              className="input-form d-block px-3 w-100"
              placeholder="مثال: EID_2026"
              value={couponName}
              onChange={onChangeName}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="fw-bold">تاريخ الانتهاء</Form.Label>
            <input
              type="date"
              className="input-form d-block px-3 w-100"
              value={couponDate}
              onChange={onChangeDate}
              // ref={dateRef}
              // type="text"
              // onFocus={() => (dateRef.current.type = "date")}
              // onBlur={() => (dateRef.current.type = "text")}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="fw-bold">نسبة الخصم (%)</Form.Label>
            <input
              type="number"
              className="input-form d-block px-3 w-100"
              value={couponValue}
              onChange={onChangeValue}
              placeholder="0"
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn-save px-5"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : null}
              حفظ الكوبون
            </button>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        <div className="admin-content-title pb-4">
          الكوبونات الحالية ({coupons.length})
        </div>
        <Col sm="10">
          <Row className="g-3">
            {coupons.length > 0 ? (
              coupons.map((item) => (
                <Col key={item._id} md={6} lg={4}>
                  <AdminCouponCard coupon={item} />
                </Col>
              ))
            ) : (
              <h6 className="text-center text-muted">لا يوجد كوبونات حالياً</h6>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AdminAddCoupon;
