// import { Col, Row } from "react-bootstrap";
// import mobile from "../../Assets/Images/mobile.png";
// import "./CartItem.css";
// import { FaTrashAlt, FaStar } from "react-icons/fa";

// function CartItem() {
//   return (
//     <Col xs="12" className="cart-item-card my-3 d-flex px-2">
//       <img src={mobile} alt="product-img" className="item-image" />

//       <div className="w-100 item-details-container">
//         <Row className="justify-content-between item-header">
//           <Col
//             sm="12"
//             className="d-flex justify-content-between align-items-start"
//           >
//             <div className="item-category">الالكترونيات</div>

//             <div className="remove-item-btn d-flex align-items-center">
//               <FaTrashAlt className="ms-1" />
//               <span>ازاله</span>
//             </div>
//           </Col>
//         </Row>

//         <Row className="mt-2">
//           <Col
//             sm="12"
//             className="d-flex justify-content-start align-items-baseline"
//           >
//             <div className="item-title me-auto">
//               آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس
//             </div>

//             <div className="item-rate-section d-flex align-items-center">
//               <FaStar className="star-icon" />
//               <div className="item-rate">4.5</div>
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col sm="12" className="mt-2 d-flex align-items-center">
//             <div className="item-label">الماركة :</div>
//             <div className="item-brand-value mx-1">ابل </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col sm="12" className="mt-2 d-flex align-items-center">
//             <div className="item-label">اللون:</div>
//             <div
//               className="item-color-swatch border ms-2"
//               style={{ backgroundColor: "#E52C2C" }}
//             ></div>
//           </Col>
//         </Row>

//         <Row className="justify-content-between mt-3 item-footer">
//           <Col
//             sm="12"
//             className="d-flex justify-content-between align-items-center"
//           >
//             <div className="d-flex align-items-center quantity-control">
//               <div className="item-label">الكمية</div>
//               <input
//                 className="quantity-input mx-2"
//                 type="number"
//                 defaultValue="1"
//               />
//             </div>

//             <div className="item-price">٣٠٠٠ جنية</div>
//           </Col>
//         </Row>
//       </div>
//     </Col>
//   );
// }

// export default CartItem;

import { Col, Row } from "react-bootstrap";
import mobile from "../../Assets/Images/mobile.png";
import "./CartItem.css";

import { FaTrashAlt, FaStar } from "react-icons/fa";

function CartItem() {
  return (
    <Col xs="12" className="cart-item-card my-3 d-flex px-2">
      <img src={mobile} alt="product-img" className="item-image" />

      <div className="w-100 item-details-container">
        <Row className="justify-content-between item-header">
          <Col
            sm="12"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="item-category">الالكترونيات</div>

            <div className="remove-item-btn d-flex align-items-center">
              <FaTrashAlt className="ms-1" />
              <span>ازاله</span>
            </div>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col
            sm="12"
            className="d-flex justify-content-start align-items-baseline"
          >
            <div className="item-title">
              آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس
            </div>

            <div className="item-rate-section d-flex align-items-center">
              <FaStar className="star-icon" />
              <div className="item-rate">4.5</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12" className="mt-2 d-flex align-items-center">
            <div className="item-label">الماركة :</div>
            <div className="item-brand-value mx-1">ابل </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12" className="mt-2 d-flex align-items-center">
            <div className="item-label">اللون:</div>
            <div
              className="item-color-swatch border ms-2"
              style={{ backgroundColor: "#E52C2C" }}
            ></div>
          </Col>
        </Row>

        <Row className="justify-content-between mt-3 item-footer">
          <Col
            sm="12"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center quantity-control">
              <div className="item-label">الكمية</div>
              <input
                className="quantity-input mx-2"
                type="number"
                defaultValue="1"
              />
            </div>

            <div className="item-price">٣٠٠٠ جنية</div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CartItem;
