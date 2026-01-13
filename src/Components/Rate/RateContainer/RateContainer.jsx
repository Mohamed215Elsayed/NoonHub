
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./RateContainer.css";
import rate from "../../../Assets/Images/rate.png";
import Pagination from "../../Uitily/Pagination/Pagination";
import RateItem from "../RateItem/RateItem";
import RateComment from "../RateComment/RateComment";
import { useParams } from "react-router-dom";
import ViewAllReviewHook from "../../../Hook/review/view-all-review-hook";

function RateContainer({ rateAvg, rateQty }) {
  const { id } = useParams();

  const { allReviewProduct, pagination, loadingGet, fetchReviewsByPage } =
    ViewAllReviewHook(id, 5);

  return (
    <Container className="rate-container shadow-sm border rounded p-3 my-4 bg-white">
      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <div className="sub-title d-inline p-1 fw-bold">التقييمات</div>
          <img
            className="mx-2"
            src={rate}
            alt="rate-img"
            height="18"
            width="18"
          />
          <div className="cat-rate d-inline fw-bold text-warning">
            {rateAvg || 0}
          </div>
          <div className="rate-count d-inline ms-1 text-muted">
            ({rateQty || 0} تقييم)
          </div>
        </Col>
      </Row>

      <RateComment />

      {/* قائمة التعليقات */}
      <div className="reviews-list-wrapper mt-4">
        {loadingGet ? (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : allReviewProduct && allReviewProduct.length > 0 ? (
          allReviewProduct.map((review) => (
            <RateItem key={review._id} review={review} />
          ))
        ) : (
          <h6 className="text-center my-5 text-muted">
            لا يوجد تقييمات لهذا المنتج بعد. كن أول من يقيم!
          </h6>
        )}
      </div>

      {/* الترقيم (Pagination) */}
      {pagination?.numberOfPages > 1 && (
        <div className="mt-4">
          <Pagination
            onPress={fetchReviewsByPage}
            pageCount={pagination.numberOfPages}
            currentPage={pagination.currentPage}
          />
        </div>
      )}
    </Container>
  );
}

export default RateContainer;
