import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center align-items-center">
        <Col xs="12" md="8" lg="5" xl="4">
          <div className="login-card">
            <h2 className="login-title">مرحباً بعودتك</h2>
            <p className="login-subtitle">سجل دخولك للاستمتاع بأفضل العروض</p>

            <Form>
              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  placeholder="البريد الإلكتروني "
                  className="login-input"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4 position-relative">
                <Form.Control
                  type="password"
                  placeholder="كلمة المرور"
                  className="login-input"
                  required
                />
                <span className="password-toggle">
                  <i className="fas fa-eye"></i>
                </span>
              </Form.Group>

              <Button className="login-btn w-100 mb-4" type="submit">
                تسجيل الدخول
              </Button>
            </Form>

            <div className="text-center mb-4">
              <Link to="/forget-password" className="forget-link">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <div className="divider">
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
              الدخول بحساب جوجل
            </Button>

            <p className="text-center register-text">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="register-link">
                إنشاء حساب جديد
              </Link>
            </p>

           
            <div className="admin-links text-center mt-5">
              <Link to="/admin/allproducts" className="admin-link">
                لوحة تحكم الأدمن
              </Link>
              <span className="mx-2 text-muted">|</span>
              <Link to="/user/allorders" className="admin-link">
                حسابي
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
