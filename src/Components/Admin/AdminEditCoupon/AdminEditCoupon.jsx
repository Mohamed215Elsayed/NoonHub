import "./AdminEditCoupon.css";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import EditCouponHook from "../../../Hook/coupon/edit-coupon-hook";
import { useParams } from "react-router-dom";

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
    loading,
  } = EditCouponHook(id);

  return (
    <div className="admin-add-coupon-container">
      <Row className="justify-content-start">
        <div className="admin-content-title pb-2">تعديل بيانات الكوبون</div>
        <p className="text-muted mb-4">
          تعديل معلومات الكوبون:{" "}
          <span className="text-primary">{couponName}</span>
        </p>

        <Col
          sm="8"
          className="coupon-form-box p-4 shadow-sm border rounded bg-white"
        >
          <Form.Group>
            <Form.Label className="fw-bold">اسم الكوبون</Form.Label>
            <input
              value={couponName}
              onChange={onChangeName}
              type="text"
              className="input-form d-block px-3 w-100"
              placeholder="اسم الكوبون"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="fw-bold">تاريخ الانتهاء</Form.Label>
            <input
              type="date"
              className="input-form d-block px-3 w-100"
              onChange={onChangeDate}
              value={couponDate}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="fw-bold">نسبة الخصم (%)</Form.Label>
            <input
              value={couponValue}
              onChange={onChangeValue}
              type="number"
              className="input-form d-block px-3 w-100"
              placeholder="نسبة خصم الكوبون"
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <button
              onClick={onSubmit}
              className="btn-save px-5 d-flex align-items-center"
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              حفظ التعديلات
            </button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminEditCoupon;
/*
import React, { useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import EditCouponHook from '../../hook/coupon/edit-coupon-hook';
import { useParams } from 'react-router-dom';

const AdminEditCoupon = () => {

    const { id } = useParams();
    const [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit] = EditCouponHook(id)

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">تعديل بيانات الكوبون</div>
                <Col sm="8">
                    <input
                        value={coupnName}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الكوبون"

                    />
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تاريخ الانتهاء"
                        onChange={onChangeDate}
                        value={couponDate}
                    />
                    <input
                        value={couponValue}
                        onChange={onChangeValue}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="نسبة خصم الكوبون"

                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">حفظ التعديل</button>
                </Col>
            </Row>


            <ToastContainer />
        </div>
    )
}

export default AdminEditCoupon
*/
