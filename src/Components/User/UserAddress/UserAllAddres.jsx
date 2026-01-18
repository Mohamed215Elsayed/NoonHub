import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";
import "./UserAddress.css";
import ViewAddressesHook from "../../../Hook/user/view-addresses-hook";

function UserAllAddres() {
  const { addresses, loading } = ViewAddressesHook();
  if (loading) return <div className="text-center mt-5">جاري التحميل...</div>;
  return (
    <div className="user-all-address-wrapper">
      <div className="content-title pb-4">دفتر العناوين</div>
      {addresses && addresses.length > 0 ? (
        addresses.map((item, index) => (
          <UserAddressCard key={item._id || index} item={item} />
        ))
      ) : (
        <div className="no-data text-center p-5">
          <p>لا توجد عناوين مسجلة حتى الآن.</p>
        </div>
      )}

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
