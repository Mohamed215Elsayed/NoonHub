// import { Container, Row, Col } from "react-bootstrap";

// const CategoryHeader = () => {
//   return (
//     <div className="cat-header">
//       <Container>
//         <Row>
//           <Col className="d-flex justify-content-start py-2 flex-wrap">
//             <div className="cat-text-header ">الكل</div>
//             <div className="cat-text-header">الكترونيات</div>
//             <div className="cat-text-header">ملابس</div>
//             <div className="cat-text-header"> كهربيه</div>
//             <div className="cat-text-header">تخفيضات</div>
//             <div className="cat-text-header">تخفيضات</div>
//             <div className="cat-text-header">تخفيضات</div>
//             <div className="cat-text-header">تخفيضات</div>
//             <div className="cat-text-header">تخفيضات</div>
//             <div className="cat-text-header">المزيد</div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default CategoryHeader;

import "./CategoryHeader.css";
import { Container } from "react-bootstrap";

const CategoryHeader = () => {
  const categories = [
    "الكل",
    "إلكترونيات",
    "ملابس",
    "أحذية",
    "أجهزة منزلية",
    "مكياج و عطور",
    "موبايلات",
    "ساعات",
    "ألعاب أطفال",
    "المزيد",
  ];

  return (
    <div className="category-header">
      <Container>
        <div className="category-list">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`category-item ${cat === "الكل" ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoryHeader;
