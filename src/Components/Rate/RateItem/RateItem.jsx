import { Row, Col, Modal, Button } from "react-bootstrap";
import "./RateItem.css";
import ReactStars from "react-rating-stars-component";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DeleteRateHook from "../../../Hook/review/delete-rate-hook";
import { useMemo } from "react";
import EditRateHook from "../../../Hook/review/edit-rate-hook";
import { useSelector } from "react-redux";
function RateItem({ review }) {
  const currentReview =
    useSelector((state) =>
      state.reviews.allReviewProduct.find((r) => r._id === review._id)
    ) || review;
  const {
    showDelete,
    handleClose,
    handleShow,
    handleDelete,
    loadingDelete,
    isOwner,
    menuRef,
  } = DeleteRateHook(review);

  const {
    showEdit,
    handleShow: handleShowEdit,
    handleClose: handleCloseEdit,
    title,
    setTitle,
    ratings,
    setRatings,
    handleUpdate,
    loadingUpdate,
  } = EditRateHook(currentReview);
  const starSettings = useMemo(
    () => ({
      size: 16,
      count: 5,
      color: "#e0e0e0",
      activeColor: "#ffc107",
      value: currentReview?.ratings || 0,
      edit: false,
      isHalf: true,
      emptyIcon: <i className="far fa-star" />,
      halfIcon: <i className="fa fa-star-half-alt" />,
      filledIcon: <i className="fa fa-star" />,
    }),
    [currentReview?.ratings]
  );
  return (
    <div className="rate-item-container py-3 border-bottom">
      <Modal
        show={showDelete}
        onHide={handleClose}
        centered
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <FaTrashAlt className="text-danger mb-3" size={40} />
          <p className="fs-5">هل أنت متأكد من رغبتك في حذف هذا التقييم؟</p>
          <small className="text-muted">
            لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
          </small>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0">
          <Button variant="secondary" onClick={handleClose} className="px-4">
            تراجع
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={loadingDelete}
            className="px-4"
          >
            {loadingDelete ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "تأكيد الحذف"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        centered
        className="edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">تعديل التقييم</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">عنوان التقييم</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">التقييم</label>
            <ReactStars
              count={5}
              value={ratings}
              onChange={setRatings}
              size={24}
              activeColor="#ffc107"
              isHalf={true}
              edit={true}
              emptyIcon={<i className="far fa-star" />}
              halfIcon={<i className="fa fa-star-half-alt" />}
              filledIcon={<i className="fa fa-star" />}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            إلغاء
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "تحديث"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="align-items-center">
        <Col className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span className="rate-user-name">
              {currentReview?.user?.name || "مستخدم"}
            </span>
            <div className="d-flex align-items-center mt-1">
              <ReactStars {...starSettings} />
              <span className="rate-number ms-1">
                ({currentReview?.ratings})
              </span>
            </div>
          </div>

          {isOwner && (
            <div className="rate-actions">
              <div className="action-menu" ref={menuRef}>
                <button
                  className="action-trigger"
                  type="button"
                  aria-label="خيارات التقييم"
                  aria-haspopup="menu"
                  aria-expanded={menuRef.current?.classList.contains("open")}
                  onClick={(e) => {
                    e.stopPropagation();
                    menuRef.current.classList.toggle("open");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      menuRef.current.classList.toggle("open");
                    }
                    if (e.key === "Escape") {
                      menuRef.current.classList.remove("open");
                    }
                  }}
                >
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </button>

                <div className="action-dropdown" role="menu">
                  <div className="dropdown-header">الخيارات</div>

                  <button
                    className="action-item edit"
                    // onClick={() => menuRef.current.classList.remove("open")}
                    onClick={() => {
                      handleClose();
                      handleShowEdit();
                    }}
                    role="menuitem"
                  >
                    <div className="icon-wrapper">
                      <FaEdit />
                    </div>
                    <span>تعديل</span>
                  </button>

                  <button
                    className="action-item delete"
                    role="menuitem"
                    onClick={handleShow}
                  >
                    <div className="icon-wrapper">
                      <FaTrashAlt />
                    </div>
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <p className="rate-comment-text mb-0">{currentReview?.title}</p>
        </Col>
      </Row>
    </div>
  );
}

export default RateItem;
