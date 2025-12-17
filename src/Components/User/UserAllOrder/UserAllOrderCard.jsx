import { Row, Col } from "react-bootstrap";
import mobile from "../../../Assets/Images/mobile.png";
import { FaTrashAlt } from "react-icons/fa";

const UserAllOrderCard = () => {
  return (
    <div className="product-item-card mb-2 p-2">
      <Row>
        <Col xs="4" sm="3" md="2" className="d-flex justify-content-center">
          <img className="product-img" src={mobile} alt="Product" />
        </Col>

        <Col xs="8" sm="9" md="8">
          <div className="card-item-details">
            <h6 className="card-item-title mb-1">
              سماعات راس أذن سلكية برأس 3.5 ملم
            </h6>

            <p className="card-item-brand mb-1">
              الماركة: <span className="brand-value">أبل</span>
            </p>

            <div className="card-item-color mb-1 d-flex align-items-center">
              اللون:
              <div
                className="color-swatch-sm ms-2"
                style={{ backgroundColor: "#E52C2C", border: "1px solid #333" }}
              ></div>
            </div>

            <p className="card-item-quantity mb-0">
              الكمية: <span className="quantity-value">2</span>
            </p>
          </div>
        </Col>

        <Col
          xs="12"
          md="2"
          className="d-flex flex-column justify-content-between align-items-end pt-3 pt-md-0"
        >
          <div className="price-tag text-end">1500 جنيه</div>

          <div className="remove-icon">
            <FaTrashAlt />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAllOrderCard;
