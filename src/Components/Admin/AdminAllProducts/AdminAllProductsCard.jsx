import { Col, Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AdminAllProducts.css';
import { FaTrashAlt, FaEdit, FaStar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import AdminDeleteProductHook from '../../../Hook/admin/delete-product-admin-hook';

function AdminAllProductsCard({ item, currentPage }) {
  const [show, handleClose, handleShow, handelDelete, loading] =
    AdminDeleteProductHook(item, currentPage);

  return (
    <Col xs="12" sm="6" md="6" lg="4" className="d-flex">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="d-flex justify-content-between align-items-center"
        >
          <Modal.Title className="font-bold">تأكيد الحذف</Modal.Title>
          <button className="custom-close-btn" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="font text-center py-3">
            هل أنت متأكد من حذف المنتج: <br />
            <strong className="text-danger">{item.title}</strong>؟
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="outline-secondary" onClick={handleClose}>
            تراجع
          </Button>
          <Button variant="danger" onClick={handelDelete} disabled={loading}>
            {loading ? 'جاري الحذف...' : 'تأكيد الحذف'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="my-2 product-card-admin">
        <div className="admin-actions-bar">
          <div className="admin-action-btn delete-btn" onClick={handleShow}>
            <FaTrashAlt className="icon" />
            <span>ازاله</span>
          </div>
          <Link
            to={`/admin/editproduct/${item._id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="admin-action-btn edit-btn">
              <FaEdit className="icon" />
              <span>تعديل</span>
            </div>
          </Link>
        </div>

        <Link to={`/products/${item._id}`} style={{ textDecoration: 'none' }}>
          <Card.Img
            src={item.imageCover}
            alt={item.title}
            className="card-img"
          />
          <Card.Body>
            <Card.Title>
              <div className="card-title">{item.title}</div>
            </Card.Title>
            <Card.Text as="div">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex product-price-section">
                  <div className="card-price">
                    {item.priceAfterDiscount
                      ? item.priceAfterDiscount
                      : item.price}
                  </div>
                  <div className="card-currency mx-1">جنيه</div>
                </div>

                <div className="d-flex align-items-center product-rate-section">
                  <FaStar className="icon star-icon" />
                  <div className="card-rate">{item.ratingsAverage || 0}</div>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}

export default AdminAllProductsCard;
