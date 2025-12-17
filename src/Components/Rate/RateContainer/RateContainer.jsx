import { Container, Row, Col } from "react-bootstrap";
import "./RateContainer.css";
import rate from "../../../Assets/Images/rate.png";
import Pagination from "../../Uitily/Pagination/Pagination";
import RateItem from "../RateItem/RateItem";
import RateComment from "../RateComment/RateComment";

function RateContainer() {
  return (
    <Container className="rate-container">
      <Row>
        <Col className="d-flex">
          <div className="sub-title d-inline p-1 ">التقيمات</div>
          <img
            className="mt-2"
            src={rate}
            alt="rate-img"
            height="16px"
            width="16px"
          />
          <div className="cat-rate  d-inline  p-1 pt-1">4.3</div>
          <div className="rate-count d-inline p-1 pt-2">(160 تقييم)</div>
        </Col>
      </Row>
      <RateComment />

      <RateItem />
      <RateItem />
      <RateItem />
      <RateItem />

      <Pagination />
    </Container>
  );
}

export default RateContainer;
