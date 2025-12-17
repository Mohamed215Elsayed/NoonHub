import { Col, Card } from "react-bootstrap";
import prod1 from "../../../Assets/Images/prod1.png";
import { Link } from "react-router-dom";
import "./AdminAllProducts.css";
import { FaTrashAlt, FaEdit, FaStar } from "react-icons/fa";

function AdminAllProductsCard() {
  return (
    <Col xs="12" sm="6" md="6" lg="4" className="d-flex">
      <Card className="my-2 product-card-admin">
        <div className="admin-actions-bar">
          <div className="admin-action-btn delete-btn">
            <FaTrashAlt className="icon" />
            <span>ازاله</span>
          </div>
          <div className="admin-action-btn edit-btn">
            <FaEdit className="icon" />
            <span>تعديل</span>
          </div>
        </div>

        <Link to="/products/:id" style={{ textDecoration: "none" }}>
          <Card.Img src={prod1} className="card-img" />
          <Card.Body>
            <Card.Title>
              <div className="card-title">
                سود كربون ساعة يد ذكية بيب إس أسود كربون
              </div>
            </Card.Title>
            <Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex product-price-section">
                  <div className="card-price">880</div>
                  <div className="card-currency mx-1">جنيه</div>
                </div>

                <div className="d-flex align-items-center product-rate-section">
                  <FaStar className="icon star-icon" />
                  <div className="card-rate">4.5</div>
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
