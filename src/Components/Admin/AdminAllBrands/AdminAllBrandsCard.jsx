import { Col, Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../AdminAllProducts/AdminAllProducts.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import AdminDeleteBrandHook from '../../../Hook/admin/AdminDeleteBrandHook';

function AdminAllBrandsCard({ item, currentPage }) {
  const [show, handleClose, handleShow, handelDelete, loading] =
    AdminDeleteBrandHook(item, currentPage);

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
            هل أنت متأكد من حذف البراند: <br />
            <strong className="text-danger">{item.name}</strong>؟
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

      <Card className="my-2 card-brands">
        <div className="admin-actions-bar-brands">
          <div className="admin-action-btn-brands delete-btn-brands" onClick={handleShow}>
            <FaTrashAlt className="icon" />
            <span>ازاله</span>
          </div>
          <Link
            to={`/admin/editbrand/${item._id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="admin-action-btn-brands edit-btn-brands">
              <FaEdit className="icon" />
              <span>تعديل</span>
            </div>
          </Link>
        </div>

        <Link to={`/brands/${item._id}`} style={{ textDecoration: 'none' }}>
          <Card.Img
            src={item.image ? item.image : '/placeholder-brand.png'}
            alt={item.name}
            className="card-img"
          />
          <Card.Body>
            <Card.Title>
              <div className="card-title">{item.name}</div>
            </Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}

export default AdminAllBrandsCard;
