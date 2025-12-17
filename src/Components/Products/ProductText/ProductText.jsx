import "./ProductText.css";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

const ProductText = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="product-text-section">
      <Row className="mb-1">
        <div className="product-category">الإلكترونيات :</div>
      </Row>

      <Row className="mb-1">
        <Col lg={10}>
          <h1 className="product-title">
            آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس
            تايم (برودكت) أحمر
            <span className="product-rating">
              <i className="fas fa-star"></i> 4.5
            </span>
          </h1>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col lg={10}>
          <span className="product-brand-label">الماركة :</span>
          <span className="product-brand-name">آبل</span>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col lg={10}>
          <div className="color-options">
            <div
              className="color-swatch active"
              style={{ backgroundColor: "#E52C2C" }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: "#000000" }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: "#FFFFFF" }}
            ></div>
            <div
              className="color-swatch"
              style={{ backgroundColor: "#FFD700" }}
            ></div>
          </div>
        </Col>
      </Row>

      <Row className="mb-2">
        <div className="product-specs-title">المواصفات :</div>
      </Row>

      <Row className="mb-1">
        <Col lg={12}>
          {/* <p className="product-description"> */}
          <p className={`product-description ${showMore ? "expanded" : ""}`}>
            يتميز بوجود بطاقة SIM مزدوجة بطاقة فعلية وبطاقة e-SIM يمكنك فتح قفل
            هاتفك الآيفون وتسجيل الدخول إلى التطبيقات والحسابات وغيرها بسهولة،
            وتعدّ خاصية معرَف الوجه الأسرع والأكثر أماناً للمصادقة عن طريق بصمة
            الوجه يتميز بشريحة A12 بايونيك والتي تعد أذكى وأقوى شريحة في الهواتف
            الذكية شكلت أكثر كاميرات العالم شهرة عصراً جديداً من التصوير
            الفوتوغرافي حيث يعمل جهاز الاستشعار الابتكاري بخاصية ISP والمحرك
            العصبي، ما يمكّنك من التقاط صور لم يسبق لها مثيل كاميرا بعدسة واحدة
            تجعل الأشخاص الموجودين في الأمام في نطاق تركيز دقيق على عكس نطاق
            الخلفية غير الواضح نظرة عامة
          </p>
          <span className="read-more" onClick={() => setShowMore(!showMore)}>
            {showMore ? "عرض أقل" : "عرض المزيد"}
          </span>
        </Col>
      </Row>

      <Row>
        <Col lg={12} >
           <div className="actions-wrapper">
          <div className="product-actions">
            <div className="product-price">34,000 جنيه</div>
            <button
              type="button"
              className="add-to-cart-btn"
              onClick={() => console.log("تم الضغط")}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              أضف إلى العربة
            </button>
          </div>
          </div>
        </Col>
      </Row>
    </div>
    
  );
};

export default ProductText;
