import React from "react";
import ReactStars from "react-rating-stars-component";
import { Col, Row } from "react-bootstrap";
import "./RateComment.css";
import AddRateHook from "../../../Hook/review/add-rate-hook";
import { useParams } from "react-router-dom";

function RateComment() {
  const { id } = useParams();
  const {
    rateText,
    rateValue,
    user,
    handleRateTextChange,
    handleRateValueChange,
    onSubmit,
    loadingCreate,
  } = AddRateHook(id);

  if (!user) {
    return (
      <div className="rate-container text-center border-0 bg-light p-3">
        <p className="text-muted m-0">يجب تسجيل الدخول لتتمكن من إضافة تقييم</p>
      </div>
    );
  }
  const userName = user?.name || "زائر";
  const isDisabled =
    loadingCreate || rateValue === 0 || rateText.trim().length === 0;
  const starSettings = {
    size: 22,
    count: 5,
    color: "#e0e0e0",
    activeColor: "#ffc107",
    value: rateValue,
    edit: true,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: handleRateValueChange,
  };

  return (
    <div className="rate-container shadow-sm mx-2 p-3">
      <Row className="mb-2">
        <Col className="d-flex align-items-center">
          <div className="rate-avatar me-2">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="rate-name">{userName}</span>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <ReactStars {...starSettings} />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="comment-box-wrapper">
            <textarea
              className="input-form-area"
              rows={3}
              value={rateText}
              onChange={handleRateTextChange}
              placeholder="اكتب تجربة استخدامك للمنتج هنا..."
              aria-label="تعليق المستخدم"
            />
            <button
              type="button"
              className="btn-rate-submit"
              onClick={onSubmit}
              disabled={isDisabled || loadingCreate}
            >
              {loadingCreate ? "جارٍ الإرسال..." : "اضف تعليق"}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RateComment;
