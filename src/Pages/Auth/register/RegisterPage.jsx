// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./RegisterPage.css";
// import RegisterHook from "../../Hook/auth/register-hook";
// import { Modal } from "react-bootstrap";
// import { useState } from "react";
// import TermsContent from "./Terms/TermsPage";
// import PrivacyContent from "./Privacy/PrivacyPage";

// const RegisterPage = () => {
//   const googleUrl = process.env.REACT_APP_GOOGLE_LOGIN;

//   const [showTerms, setShowTerms] = useState(false);
//   const [showPrivacy, setShowPrivacy] = useState(false);

//   const {
//     formData,
//     handleChange,
//     handleSubmit,
//     showPassword,
//     togglePassword,
//     loading,
//   } = RegisterHook();

//   return (
//     <Container style={{ minHeight: "680px" }}>
//       <Row className="py-5 d-flex justify-content-center align-items-center">
//         <Col xs="12" md="8" lg="6" xl="5">
//           <div className="register-card">
//             <div className="text-center mb-4">
//               <h2 className="register-title">إنشاء حساب جديد</h2>
//               <p className="register-subtitle">
//                 انضم إلينا واستمتع بأحدث العروض والخصومات
//               </p>
//             </div>

//             <Form onSubmit={handleSubmit} dir="rtl">
//               <fieldset disabled={loading}>
//                 <Form.Group className="mb-4">
//                   <Form.Control
//                     type="text"
//                     placeholder="الاسم الكامل"
//                     className="register-input"
//                     required
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Control
//                     type="email"
//                     placeholder="البريد الإلكتروني"
//                     className="register-input"
//                     autoComplete="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Control
//                     type="tel"
//                     placeholder="رقم الجوال (اختياري)"
//                     pattern="^(?:\+?20|0)?1[0125][0-9]{8}$|^(?:\+?966)?5[0-9]{8}$"
//                     className="register-input"
//                     inputMode="numeric"
//                     autoComplete="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4 position-relative">
//                   <Form.Control
//                     placeholder="كلمة المرور"
//                     className="register-input"
//                     name="password"
//                     autoComplete="new-password"
//                     type={showPassword.password ? "text" : "password"}
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <span
//                     className="password-toggle"
//                     role="button"
//                     tabIndex={0}
//                     onClick={() => togglePassword("password")}
//                   >
//                     <i
//                       className={`fas fa-eye${
//                         showPassword.password ? "-slash" : ""
//                       }`}
//                     ></i>
//                   </span>
//                 </Form.Group>

//                 <Form.Group className="mb-4 position-relative">
//                   <Form.Control
//                     placeholder="تأكيد كلمة المرور"
//                     autoComplete="new-password"
//                     type={showPassword.confirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="register-input"
//                     required
//                   />
//                   <span
//                     className="password-toggle"
//                     role="button"
//                     tabIndex={0}
//                     onClick={() => togglePassword("confirmPassword")}
//                   >
//                     <i
//                       className={`fas fa-eye${
//                         showPassword.confirmPassword ? "-slash" : ""
//                       }`}
//                     ></i>
//                   </span>
//                 </Form.Group>
//                 <Modal
//                   show={showTerms}
//                   onHide={() => setShowTerms(false)}
//                   size="lg"
//                   centered
//                 >
//                   <Modal.Header closeButton>
//                     <Modal.Title>الشروط والأحكام</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
//                     <TermsContent />
//                   </Modal.Body>
//                 </Modal>
//                 <Modal
//                   show={showPrivacy}
//                   onHide={() => setShowPrivacy(false)}
//                   size="lg"
//                   centered
//                 >
//                   <Modal.Header closeButton>
//                     <Modal.Title>سياسة الخصوصية</Modal.Title>
//                   </Modal.Header>

//                   <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
//                     <PrivacyContent />
//                   </Modal.Body>
//                 </Modal>

//                 <Form.Check
//                   type="checkbox"
//                   className="mb-4 custom-checkbox"
//                   name="agreeTerms"
//                   checked={formData.agreeTerms}
//                   onChange={handleChange}
//                   required
//                   label={
//                     <>
//                       أوافق على{" "}
//                       <span
//                         className="terms-link"
//                         role="button"
//                         tabIndex={0}
//                         onClick={() => setShowTerms(true)}
//                         onKeyDown={(e) =>
//                           e.key === "Enter" && setShowTerms(true)
//                         }
//                       >
//                         الشروط والأحكام
//                       </span>{" "}
//                       و{" "}
//                       <span
//                         className="terms-link"
//                         role="button"
//                         tabIndex={0}
//                         onClick={() => setShowPrivacy(true)}
//                         onKeyDown={(e) =>
//                           e.key === "Enter" && setShowPrivacy(true)
//                         }
//                       >
//                         سياسة الخصوصية
//                       </span>
//                     </>
//                   }
//                 />

//                 <Button
//                   className="register-btn w-100"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
//                 </Button>
//               </fieldset>
//             </Form>

//             <div className="divider my-4">
//               <span>أو</span>
//             </div>

//             <Button
//               variant="outline-dark"
//               className="social-btn google-btn w-100 mb-3"
//               onClick={() => (window.location.href = googleUrl)}
//             >
//               <img
//                 src="https://www.google.com/favicon.ico"
//                 alt="Google"
//                 width="20"
//                 className="me-2"
//               />
//               التسجيل بحساب جوجل
//             </Button>

//             <p className="text-center login-text mt-4">
//               لديك حساب بالفعل؟{" "}
//               <Link to="/login" className="login-link">
//                 تسجيل الدخول
//               </Link>
//             </p>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RegisterPage;
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterHook from "../../../Hook/auth/register-hook";
import TermsContent from "../Terms/TermsPage";
import PrivacyContent from "../Privacy/PrivacyPage";
import "./RegisterPage.css";

const RegisterPage = () => {
  // const googleUrl = process.env.REACT_APP_GOOGLE_LOGIN;

  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    showPassword,
    togglePassword,
  } = RegisterHook();

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center align-items-center">
        <Col xs="12" md="8" lg="6" xl="5">
          <div className="register-card">
            <h2 className="register-title text-center">إنشاء حساب جديد</h2>

            <Form onSubmit={handleSubmit(onSubmit)} dir="rtl">
              <fieldset disabled={loading}>
                {/* الاسم */}
                <Form.Group className="mb-3">
                  <Form.Control
                    {...register("fullName")}
                    placeholder="الاسم الكامل"
                    className={`register-input ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <small className="text-danger">
                      {errors.fullName.message}
                    </small>
                  )}
                </Form.Group>

                {/* الإيميل */}
                <Form.Group className="mb-3">
                  <Form.Control
                    {...register("email")}
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className={`register-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </Form.Group>

                {/* الهاتف */}
                <Form.Group className="mb-3">
                  <Form.Control
                    {...register("phone")}
                    placeholder="رقم الجوال (اختياري)"
                    className={`register-input ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                  />
                  {errors.phone && (
                    <small className="text-danger">
                      {errors.phone.message}
                    </small>
                  )}
                </Form.Group>

                {/* كلمة المرور */}
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    {...register("password")}
                    type={showPassword.password ? "text" : "password"}
                    placeholder="كلمة المرور"
                    autoComplete="new-password"
                    className={`register-input ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => togglePassword("password")}
                  >
                    <i
                      className={`fas fa-eye${
                        showPassword.password ? "-slash" : ""
                      }`}
                    ></i>
                  </span>
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </Form.Group>

                {/* تأكيد كلمة المرور */}
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    {...register("confirmPassword")}
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="تأكيد كلمة المرور"
                    autoComplete="new-password"
                    className={`register-input ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => togglePassword("confirmPassword")}
                  >
                    <i
                      className={`fas fa-eye${
                        showPassword.confirmPassword ? "-slash" : ""
                      }`}
                    ></i>
                  </span>
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword.message}
                    </small>
                  )}
                </Form.Group>

                {/* الشروط */}
                <Form.Group className="mb-3">
                  <Form.Check
                    {...register("agreeTerms")}
                    type="checkbox"
                    className="custom-checkbox"
                    label={
                      <span>
                        أوافق على{" "}
                        <span
                          className="terms-link"
                          onClick={() => setShowTerms(true)}
                        >
                          الشروط
                        </span>{" "}
                        و{" "}
                        <span
                          className="terms-link"
                          onClick={() => setShowPrivacy(true)}
                        >
                          الخصوصية
                        </span>
                      </span>
                    }
                  />
                  {errors.agreeTerms && (
                    <small className="text-danger d-block">
                      {errors.agreeTerms.message}
                    </small>
                  )}
                </Form.Group>

                {/* زر التسجيل */}
                <Button
                  className="register-btn w-100 d-flex justify-content-center align-items-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      جاري المعالجة...
                    </>
                  ) : (
                    "إنشاء الحساب"
                  )}
                </Button>
              </fieldset>
            </Form>

            {/* <div className="divider my-4">
              <span>أو</span>
            </div>

            <Button
              variant="outline-dark"
              className="social-btn w-100 mb-3"
              onClick={() => (window.location.href = googleUrl)}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="G"
                width="20"
                className="me-2"
              />
              التسجيل بحساب جوجل
            </Button> */}

            <p className="text-center mt-3">
              لديك حساب؟{" "}
              <Link to="/login" className="login-link">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </Col>
      </Row>

      {/* الشروط */}
      <Modal show={showTerms} onHide={() => setShowTerms(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>الشروط والأحكام</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <TermsContent />
        </Modal.Body>
      </Modal>

      {/* الخصوصية */}
      <Modal
        show={showPrivacy}
        onHide={() => setShowPrivacy(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>سياسة الخصوصية</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <PrivacyContent />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default RegisterPage;

