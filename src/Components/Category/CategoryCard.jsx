// import { Col } from "react-bootstrap";
// import "./CategoryCard.css";
// function CategoryCard({ background, img, title }) {
//   return (
//     <Col
//       xs="6"
//       sm="6"
//       md="4"
//       lg="2"
//       className="my-4 d-flex justify-content-around "
//     >
//       <div className="allCard mb-3 ">
//         <div
//           className="categoty-card "
//           style={{ backgroundColor: `${background}` }}
//         ></div>{" "}
//         <img alt="categoty-card" src={img} className="categoty-card-img" />
//         <p className="categoty-card-text my-2">{title}</p>
//       </div>
//     </Col>
//   );
// }

// export default CategoryCard;

import React from "react";
import "./CategoryCard.css";
import { Col } from "react-bootstrap";

const CategoryCard = ({ img, title, link = "/allcategory" }) => {
  return (
    <Col xs={6} sm={6} md={4} lg={2} className="px-2">
      <a href={link} className="modern-cat-card d-block">
        <div className="modern-cat-img-wrapper">
          <img src={img} alt={title} className="modern-cat-img" />
          <div className="modern-cat-overlay"></div>
        </div>
        <p className="modern-cat-title">{title}</p>
      </a>
    </Col>
  );
};

export default CategoryCard;