import "./CategoryCard.css";
import { Col } from "react-bootstrap";
const CategoryCard = ({ img, title, link = "/allcategory" }) => {
  //, background
  return (
    <Col xs={6} sm={6} md={4} lg={2} className="px-2">
      <a href={link} className="modern-cat-card d-block">
        <div className="modern-cat-img-wrapper">
          {/* <div
            className="categoty-card "
            style={{ backgroundColor: `${background}` }}
          ></div> */}
          <img src={img} alt={title} className="modern-cat-img" />
          <div className="modern-cat-overlay"></div>
        </div>
        <p className="modern-cat-title">{title}</p>
      </a>
    </Col>
  );
};

export default CategoryCard;
