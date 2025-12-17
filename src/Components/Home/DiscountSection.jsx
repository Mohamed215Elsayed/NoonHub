// import { Container, Row, Col } from "react-bootstrap";
// import laptops from "../../Assets/Images/laptops.png";
// import "./DiscountSection.css";
// function DiscountSection() {
//   return (
//     <Container>
//       <Row className="discount-backcolor my-3  mx-2 d-flex text-center align-items-center">
//         <Col sm="6" className="text-section">
//           <div className="discount-title">
//             خصم يصل حتي ٣٠٪ علي اجهازه اللاب توب
//           </div>
//           <button className="discount-btn">تسوق الآن</button>
//         </Col>
//         <Col sm="6" className="image-section">
//           <img className="dicount-img" src={laptops} alt="discount-img" />
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default DiscountSection;
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import laptops from "../../Assets/Images/laptops.png";
import "./DiscountSection.css";

function DiscountSection() {
  return (
    <Container className="my-5">
      <Row className="discount-section align-items-center">
        <Col lg="7" className="position-relative">
          <img src={laptops} alt="لاب توب" className="discount-laptop-img" />
          <div className="discount-circle">
            <span className="discount-percent">حتى</span>
            <span className="discount-number">30%</span>
          </div>
        </Col>

        <Col lg="5" className="text-center text-lg-end px-4">
          <h2 className="discount-main-title">
            خصم يصل حتى <span className="highlight">30%</span>
            <br />
            على أحدث أجهزة اللاب توب
          </h2>
          <p className="discount-subtitle mb-4">
            عروض لفترة محدودة · أفضل الماركات · شحن مجاني
          </p>
          <Link to="/category/laptops">
            <Button className="discount-cta-btn">
              تسوق الآن
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default DiscountSection;