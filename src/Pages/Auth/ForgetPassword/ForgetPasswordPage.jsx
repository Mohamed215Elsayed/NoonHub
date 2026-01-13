import { Container, Row, Col, Spinner } from "react-bootstrap";
import ForgetPasswordHook from "../../../Hook/auth/forget-password-hook";
import "./ForgetPasswordPage.css";

const ForgetPasswordPage = () => {
  const { OnChangeEmail, email, onSubmit, loading } = ForgetPasswordHook();

  return (
    <div className="forget-password-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col sm="12" md="6" lg="4">
            <div className="forget-password-card animate-card">
              <label className="title-login">نسيت كلمة السر</label>

              <input
                value={email}
                onChange={OnChangeEmail}
                placeholder="ادخل الايميل..."
                type="email"
                autoComplete="email"
                className="user-input"
                autoFocus
              />

              <small className="helper-text">
                سيتم إرسال كود التحقق إلى بريدك الإلكتروني
              </small>

              <button
                onClick={onSubmit}
                className="btn-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    جاري الإرسال...
                  </>
                ) : (
                  "ارسال الكود"
                )}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgetPasswordPage;
