// import { Container, Row, Col } from "react-bootstrap";
// import VerifyPasswordHook from "../../../Hook/auth/verify-password-hook";
// import "./VerifyPasswordPage.css";

// const VerifyPasswordPage = () => {
//   const { code, onChangeCode, onSubmit, loading } =
//     VerifyPasswordHook();

//   return (
//     <div className="verify-wrapper">
//       <Container>
//         <Row className="justify-content-center">
//           <Col sm="12" md="6" lg="4">
//             <div className="verify-card">
//               <h4 className="verify-title">
//                 ادخل الكود المرسل إلى بريدك
//               </h4>

//               <input
//                 value={code}
//                 onChange={onChangeCode}
//                 placeholder="ادخل الكود..."
//                 type="text"
//                 className="verify-input"
//               />

//               <button
//                 onClick={onSubmit}
//                 className="verify-btn"
//                 disabled={loading}
//               >
//                 {loading ? "جاري التحقق..." : "تأكيد"}
//               </button>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default VerifyPasswordPage;

// import React from "react";
// import { Container, Row, Col, Spinner } from "react-bootstrap";
// import VerifyPasswordHook from "../../../Hook/auth/verify-password-hook";
// import "./VerifyPasswordPage.css";

// const VerifyPasswordPage = () => {
//   const { code, OnChangeCode, onSubmit, loading } =
//     VerifyPasswordHook();

//   return (
//     <Container style={{ minHeight: "690px" }}>
//       <Row className="py-5 d-flex justify-content-center">
//         <Col sm="12" className="d-flex flex-column">
//           <label className="mx-auto title-login">
//             تأكيد كود التفعيل
//           </label>

//           <p className="text-center text-muted">
//             أدخل الكود المكون من 6 أرقام المرسل إلى بريدك
//           </p>

//           <input
//             value={code}
//             onChange={OnChangeCode}
//             placeholder="000000"
//             type="text"
//             maxLength="6"
//             inputMode="numeric"
//             className="user-input my-3 text-center mx-auto code-input"
//           />

//           <button
//             onClick={onSubmit}
//             className="btn-login mx-auto mt-2"
//             disabled={loading}
//           >
//             {loading ? (
//               <Spinner animation="border" size="sm" />
//             ) : (
//               "تأكيد الكود"
//             )}
//           </button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default VerifyPasswordPage;

import { Container, Row, Col, Spinner } from "react-bootstrap";
import VerifyPasswordHook from "../../../Hook/auth/verify-password-hook";

import "./VerifyPasswordPage.css";

const VerifyPasswordPage = () => {
  const { code, OnChangeCode, onSubmit, loading } =
    VerifyPasswordHook();

  return (
    <div className="verify-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col sm="12" md="6" lg="4">
            <div className="verify-card text-center">
              <label className="title-login">
                تأكيد كود التفعيل
              </label>

              <p className="verify-subtitle">
                أدخل الكود المكون من 6 أرقام المرسل إلى بريدك
              </p>

              <input
                value={code}
                onChange={OnChangeCode}
                placeholder="000000"
                type="text"
                maxLength="6"
                inputMode="numeric"
                className="user-input code-input mx-auto d-block mb-3 text-center"
              />

              <button
                onClick={onSubmit}
                className="btn-login mx-auto mt-2"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "تأكيد الكود"
                )}
              </button>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default VerifyPasswordPage;
