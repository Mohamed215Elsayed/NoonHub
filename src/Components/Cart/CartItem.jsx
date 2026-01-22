import { Button, Col, Modal, Row } from 'react-bootstrap';
import { FaTrashAlt, FaStar } from 'react-icons/fa';
// import mobile from '../../Assets/Images/mobile.png';
import DeleteCartHook from '../../Hook/cart/delete-cart-hook';
import './CartItem.css';
import UpdateQuantityCartHook from '../../Hook/cart/update-quanity-cart-hook';

function CartItem({ item }) {
  const { show, handleClose, handleShow, handelDeleteItem, isDeleting } =
    DeleteCartHook(item);
  const { itemCount, setItemCount, handleUpdate, isUpdating } =
    UpdateQuantityCartHook(item);
  const { product, color, price } = item || {};

  return (
    <Col xs={12} className="cart-item-card my-3 px-2">
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="delete-modal-title">تأكيد الحذف</Modal.Title>
        </Modal.Header>

        <Modal.Body className="delete-modal-body">
          <p>هل أنت متأكد من حذف هذا المنتج من عربة التسوق؟</p>
          <span className="text-muted">لا يمكن التراجع عن هذا الإجراء</span>
        </Modal.Body>

        <Modal.Footer className="delete-modal-footer">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="modal-cancel-btn"
          >
            تراجع
          </Button>

          <Button
            variant="danger"
            onClick={handelDeleteItem}
            disabled={isDeleting}
            className="modal-delete-btn"
          >
            {isDeleting ? 'جارٍ الحذف...' : 'حذف المنتج'}
          </Button>
        </Modal.Footer>
      </Modal>

      <img
        // src={product?.imageCover || mobile}
        src={product?.imageCover}
        alt={product?.title || 'product image'}
        className="item-image"
        // loading="lazy"
      />

      <div className="item-details-container">
        <Row className="item-header">
          <Col className="d-flex justify-content-between align-items-start">
            <span className="item-category">
              {product?.category?.name || 'بدون قسم'}
            </span>

            <button
              className="remove-item-btn"
              onClick={handleShow}
              aria-label="remove item"
            >
              <FaTrashAlt />
              <span>إزالة</span>
            </button>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col className="d-flex justify-content-between align-items-center">
            <h3 className="item-title">
              {product?.title || 'عنوان المنتج غير متوفر'}
            </h3>

            <div className="item-rate-section">
              <FaStar className="star-icon" />
              <span className="item-rate">{product?.ratingsAverage || 0}</span>
            </div>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col className="d-flex align-items-center">
            <span className="item-label">الماركة:</span>
            <span className="item-brand-value mx-1">
              {product?.brand?.name || 'لا يوجد'}
            </span>
          </Col>
        </Row>

        {color && (
          <Row className="mt-2">
            <Col className="d-flex align-items-center">
              <span className="item-label">اللون:</span>
              <span
                className="item-color-swatch mx-2"
                style={{ backgroundColor: color }}
              />
            </Col>
          </Row>
        )}

        <Row className="item-footer mt-3">
          <Col className="d-flex justify-content-between align-items-center">
            {/* <div className="quantity-control">
              <span className="item-label">الكمية</span>
              <input
                type="number"
                min="1"
                value={itemCount}
                onChange={(e) => setItemCount(e.target.value)}
                style={{ width: '60px' }}
                className="quantity-input mx-2"
              />
              <button
                onClick={handleUpdate}
                className="update-qty-btn ms-2"
                disabled={isUpdating || itemCount === item.quantity}
              >
               {isUpdating ? '...' : 'تحديث'}
              </button>
            </div> */}
            <div className="quantity-control">
              <span className="item-label">الكمية</span>
              <button
                className="qty-btn"
                onClick={() =>
                  setItemCount((prev) => Math.max(1, Number(prev) - 1))
                }
              >
                -
              </button>

              <input
                type="number"
                value={itemCount}
                readOnly
                onChange={(e) => setItemCount(e.target.value)}
                className="quantity-input mx-2"
                style={{
                  width: '45px',
                  border: 'none',
                  background: 'transparent',
                }}
              />
              <button
                className="qty-btn"
                onClick={() => setItemCount((prev) => Number(prev) + 1)}
              >
                +
              </button>

              <button
                onClick={handleUpdate}
                className="update-qty-btn ms-3"
                disabled={isUpdating || itemCount === item.quantity}
              >
                {isUpdating ? '...' : 'تحديث'}
              </button>
            </div>

            <div className="item-price">{price} جنية</div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default CartItem;
