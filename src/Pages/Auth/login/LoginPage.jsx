import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginHook from "../../../Hook/auth/login-hook";
import "./LoginPage.css";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    showPassword,
    togglePassword,
    errors,
    loading,
  } = LoginHook();
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <Container style={{ minHeight: "680px" }}>
      <Row className="py-5 d-flex justify-content-center align-items-center">
        <Col xs="12" md="8" lg="5" xl="4">
          <div className="login-card">
            <h2 className="login-title">مرحباً بعودتك</h2>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  {...register("email")}
                  type="email"
                  placeholder="البريد الإلكتروني"
                  autoComplete="email"
                  className={`login-input ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </Form.Group>

              <Form.Group className="mb-3 position-relative">
                <Form.Control
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة المرور"
                  autoComplete="current-password"
                  className={`login-input ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                <span className="password-toggle" onClick={togglePassword}>
                  <i
                    className={`fas fa-eye${showPassword ? "-slash" : ""}`}
                  ></i>
                </span>
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </Form.Group>

              <Button
                className="login-btn w-100 d-flex align-items-center justify-content-center"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2 text-light"
                    />
                    جاري التحميل...
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </Form>

            <div className="text-center mb-4">
              <Link to="/user/forget-password" className="forget-link">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <div className="divider">
              <span>أو</span>
            </div>

            <Button
              variant="outline-dark"
              onClick={handleGoogleLogin}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;

// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import LoginHook from "../../Hook/auth/login-hook";
// import "./LoginPage.css";
// const LoginPage = () => {
//   const {
//     formData,
//     handleChange,
//     showPassword,
//     togglePassword,
//     handleSubmit,
//     loading,
//   } = LoginHook();
// const handleGoogleLogin = () => {
//   window.location.href = "http://localhost:8000/api/v1/auth/google";
// };

//   return (
//     <Container style={{ minHeight: "680px" }}>
//       <Row className="py-5 d-flex justify-content-center align-items-center">
//         <Col xs="12" md="8" lg="5" xl="4">
//           <div className="login-card">
//             <h2 className="login-title">مرحباً بعودتك</h2>
//             <p className="login-subtitle">سجل دخولك للاستمتاع بأفضل العروض</p>

//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-4">
//                 <Form.Control
//                   type="email"
//                   placeholder="البريد الإلكتروني"
//                   className="login-input"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className="mb-4 position-relative">
//                 <Form.Control
//                   type={showPassword.password ? "text" : "password"}
//                   placeholder="كلمة المرور"
//                   className="login-input"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <span
//                   className="password-toggle"
//                   role="button"
//                   tabIndex={0}
//                   onClick={() => togglePassword("password")}
//                 >
//                   <i
//                     className={`fas fa-eye${
//                       showPassword.password ? "-slash" : ""
//                     }`}
//                   ></i>
//                 </span>
//               </Form.Group>

//               <Button
//                 className="login-btn w-100 mb-4"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
//               </Button>
//             </Form>

//             <div className="text-center mb-4">
//               <Link to="/forget-password" className="forget-link">
//                 نسيت كلمة المرور؟
//               </Link>
//             </div>

//             <div className="divider">
//               <span>أو</span>
//             </div>

//             <Button
//               variant="outline-dark"
//               onClick={handleGoogleLogin}
//               className="social-btn google-btn w-100 mb-3"
//             >
//               <img
//                 src="https://www.google.com/favicon.ico"
//                 alt="Google"
//                 width="20"
//                 className="me-2"
//               />
//               الدخول بحساب جوجل
//             </Button>

//             <p className="text-center register-text">
//               ليس لديك حساب؟{" "}
//               <Link to="/register" className="register-link">
//                 إنشاء حساب جديد
//               </Link>
//             </p>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginPage;

/*
<div className="admin-links text-center mt-5">
              <Link to="/admin/allproducts" className="admin-link">
                لوحة تحكم الأدمن
              </Link>
              <span className="mx-2 text-muted">|</span>
              <Link to="/user/allorders" className="admin-link">
                حسابي
              </Link>
            </div>
 */
