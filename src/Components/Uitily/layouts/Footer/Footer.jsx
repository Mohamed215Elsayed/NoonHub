import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";
import { GiReceiveMoney } from "react-icons/gi";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-end mb-4 mb-lg-0">
              <h3 className="newsletter-title">اشترك في النشرة البريدية</h3>
              <p className="newsletter-subtitle">
                احصل على أحدث العروض والتخفيضات قبل أي حد!
              </p>
            </Col>
            <Col lg={6}>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  اشترك الآن
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer */}
      <div className="footer-content py-5">
        <Container>
          <Row className="g-5">
            {/* About Us */}
            <Col lg={3} md={6}>
              <h5 className="footer-heading">معلومات عنا</h5>
              <p className="footer-desc">
                متجر Ecommerce Hub يقدم أفضل المنتجات بأفضل جودة مع أسرع توصيل
                في مصر والوطن العربي.
              </p>
              <div className="social-icons">
                <a href="/#" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="/#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="/#" aria-label="Twitter">
                  <FaTwitter />
                </a>
                {/* <a href="/#" aria-label="WhatsApp" className="whatsapp">
                  <FaWhatsapp />
                </a> */}
                <a
                  href="/https://wa.me/01027305928"
                  target="_blank"
                  rel="noopener"
                  aria-label="WhatsApp"
                  className="whatsapp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={3} md={6}>
              <h5 className="footer-heading">روابط سريعة</h5>
              <ul className="footer-links">
                <li>
                  <a href="/#">من نحن</a>
                </li>
                <li>
                  <a href="/#">سياسة الخصوصية</a>
                </li>
                <li>
                  <a href="/#">الشروط والأحكام</a>
                </li>
                <li>
                  <a href="/#">سياسة الإرجاع والاستبدال</a>
                </li>
                <li>
                  <a href="/#">الشحن والتوصيل</a>
                </li>
                <li>
                  <a href="/#">اتصل بنا</a>
                </li>
                <li>
                  <a href="/#">الأسئلة الشائعة</a>
                </li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col lg={3} md={6}>
              <h5 className="footer-heading">تواصل معنا</h5>
              <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <div>
                  <span className="contact-label">تليفون</span>
                  <p dir="ltr">01027305928</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <span className="contact-label">البريد الإلكتروني</span>
                  <p>support@ecommercehub.com</p>
                </div>
              </div>
            </Col>

            {/* Payment Methods */}
            <Col lg={3} md={6}>
              <h5 className="footer-heading">وسائل الدفع الآمنة</h5>
              <div className="payment-methods">
                <div className="payment-icon">
                  <SiVisa />
                </div>
                <div className="payment-icon">
                  <SiMastercard />
                </div>
                <div className="payment-icon paypal">
                  <SiPaypal />
                </div>
                <div className="payment-icon cash">
                  <GiReceiveMoney />
                </div>
              </div>
              <p className="secure-note mt-3">
                <small>جميع المعاملات مؤمنة ومشفرة 100%</small>
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <Container>
          <p>
            © {new Date().getFullYear()} Ecommerce Hub - جميع الحقوق محفوظة
            <span className="mx-2">|</span>
            صُنع بـ ❤️ في مصر
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
