import { Container, Row } from "react-bootstrap";
import SubTitle from "../Uitily/ButtonsTitles/SubTitle";
import BrandCard from "./BrandCard";
import brand1 from "../../Assets/Images/brand1.png";
import brand2 from "../../Assets/Images/brand2.png";
import brand3 from "../../Assets/Images/brand3.png";
import "./BrandFeatured.css";
function BrandFeatured({ title = "أشهر الماركات", 
  btntitle = "عرض الكل", pathText }) {
  return (
    <section className="brand-featured py-5">
      <Container>

        <SubTitle title={title} btntitle={btntitle} pathText="/allbrand" />
        <Row className="my-2 d-flex justify-content-between">
          <BrandCard img={brand1} />
          <BrandCard img={brand2} />
          <BrandCard img={brand3} />
          <BrandCard img={brand2} />
          <BrandCard img={brand1} />
          <BrandCard img={brand3} />
        </Row>
      </Container>
    </section>
  );
}

export default BrandFeatured;
