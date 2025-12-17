import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";
import "./UserAddress.css";

function UserAllAddres() {
  return (
    <div className="user-all-address-wrapper">
      <div className="content-title pb-4">دفتر العناوين</div>
      <UserAddressCard />
      <UserAddressCard />
      <UserAddressCard />

      <Row className="justify-content-center mt-4">
        <Col sm="12" className="d-flex justify-content-center">
          <Link to="/user/add-address" className="w-100 w-md-50">
            <button className="btn-add-address w-100">اضافة عنوان جديد</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default UserAllAddres;
