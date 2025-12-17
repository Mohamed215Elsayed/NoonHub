import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
const RegisterPage = () => {
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center align-items-center">
        <Col xs="12" md="8" lg="6" xl="5">
          <div className="register-card">
            <div className="text-center mb-4">
              <h2 className="register-title">إنشاء حساب جديد</h2>
              <p className="register-subtitle">
                انضم إلينا واستمتع بأحدث العروض والخصومات
              </p>
            </div>

            <Form>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="الاسم الكامل"
                  className="register-input"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="register-input"
                  required
                />
              </Form.Group>

              {/* <Form.Group className="mb-4">
                <Form.Control
                  type="tel"
                  placeholder="رقم الجوال (اختياري)"
                  className="register-input"
                />
              </Form.Group> */}

              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type="password"
                  placeholder="كلمة المرور"
                  className="register-input"
                  required
                />
                <span className="password-toggle">
                  <i className="fas fa-eye"></i>
                </span>
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  className="register-input"
                  required
                />
                <span className="password-toggle">
                  <i className="fas fa-eye"></i>
                </span>
              </Form.Group>

              <Form.Check
                type="checkbox"
                label={
                  <>
                    أوافق على{" "}
                    <Link to="/terms" className="terms-link">
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link to="/privacy" className="terms-link">
                      سياسة الخصوصية
                    </Link>
                  </>
                }
                className="mb-4 text-muted"
                required
              />

              <Button className="register-btn w-100" type="submit">
                إنشاء الحساب
              </Button>
            </Form>

            <div className="divider my-4">
              <span>أو</span>
            </div>

            <Button
              variant="outline-dark"
              className="social-btn google-btn w-100 mb-3"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width="20"
                className="me-2"
              />
              التسجيل بحساب جوجل
            </Button>

            <p className="text-center login-text mt-4">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="login-link">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
