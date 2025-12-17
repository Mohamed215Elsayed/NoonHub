import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const UserAddressCard = () => {
  return (
    <div className="user-address-card my-3 p-3">
      <Row className="d-flex justify-content-between header-row">
        <Col xs="4" sm="2" className="address-type-col">
          <div className="address-type-tag">المنزل</div>
        </Col>

        <Col
          xs="8"
          sm="5"
          className="d-flex justify-content-end action-icons-col"
        >
          <Link to="/user/edit-address" className="action-link edit-link">
            <FaEdit className="action-icon edit-icon" />
            <span className="action-text">تعديل</span>
          </Link>

    
          <div className="action-link delete-link ms-3">
            <FaTrashAlt className="action-icon delete-icon" />
            <span className="action-text">ازالة</span>
          </div>
        </Col>
      </Row>

 
      <Row className="mt-2 address-detail-row">
        <Col xs="12">
          <div className="address-detail-text">
            القاهرة مدينة نصر شارع التسعين عمارة ١٤
          </div>
        </Col>
      </Row>

  
      <Row className="mt-3 phone-row">
        <Col xs="12" className="d-flex">
          <div className="phone-label">رقم الهاتف:</div>

          <div className="phone-value mx-2">01027305928</div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAddressCard;
