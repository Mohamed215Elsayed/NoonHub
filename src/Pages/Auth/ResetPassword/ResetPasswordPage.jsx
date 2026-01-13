import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ResetPasswordHook from "../../../Hook/auth/reset-password-hook";
import "./ResetPasswordPage.css";
import notify from "../../../Hook/useNotifaction";

const ResetPasswordPage = () => {
  const {
    password,
    confirmPassword,
    OnChangePassword,
    OnChangeConfirmPassword,
    onSubmit,
    loading,
    showPassword,
    toggleShowPassword,
    passwordStrength,
    isPasswordMatch,
    showConfirm,
    toggleShowConfirm,
  } = ResetPasswordHook();

  return (
    <div className="reset-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md="6" lg="4">
            <div className="reset-card">
              <h3 className="title-login">تعيين كلمة سر جديدة</h3>
              <p className="reset-subtitle">من فضلك أدخل كلمة سر قوية</p>
              {/* Password */}
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={OnChangePassword}
                  placeholder="كلمة السر الجديدة"
                  className={`reset-input ${passwordStrength}`}
                />
                <span className="eye-icon" onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Strength Meter */}
              {passwordStrength && (
                <div className="strength-meter">
                  <span className={`bar ${passwordStrength}`} />
                  <p className={`strength-text ${passwordStrength}`}>
                    {passwordStrength === "weak" && "ضعيفة"}
                    {passwordStrength === "medium" && "متوسطة"}
                    {passwordStrength === "strong" && "قوية"}
                  </p>
                </div>
              )}
              <div className="password-rules">
                <span className="info-icon">ℹ</span>
                <div className="tooltip-box">
                  <p>يجب أن تحتوي كلمة السر على:</p>
                  <ul>
                    <li className={password.length >= 8 ? "ok" : ""}>
                      8 حروف على الأقل
                    </li>
                    <li className={/[A-Z]/.test(password) ? "ok" : ""}>
                      حرف كبير (A-Z)
                    </li>
                    <li className={/[0-9]/.test(password) ? "ok" : ""}>
                      رقم (0-9)
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(password) ? "ok" : ""}>
                      رمز خاص (@ # $)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Confirm Password */}

              <div className="password-field">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={OnChangeConfirmPassword}
                  placeholder="تأكيد كلمة السر"
                  className={`reset-input confirm ${
                    confirmPassword
                      ? isPasswordMatch
                        ? "success"
                        : "error"
                      : ""
                  }`}
                  onPaste={(e) => {
                    e.preventDefault();
                    notify("من فضلك اكتب كلمة السر يدويًا للتأكيد", "info");
                  }}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                />

                <span className="eye-icon" onClick={toggleShowConfirm}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Validation message */}
              {confirmPassword && (
                <p
                  className={`match-text ${
                    isPasswordMatch ? "success" : "error"
                  }`}
                >
                  {isPasswordMatch
                    ? "✔ كلمتا السر متطابقتان"
                    : "✖ كلمتا السر غير متطابقتين"}
                </p>
              )}

              <button
                onClick={onSubmit}
                className="reset-btn"
                disabled={
                  loading || passwordStrength !== "strong" || !isPasswordMatch
                }
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "حفظ كلمة السر"
                )}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
