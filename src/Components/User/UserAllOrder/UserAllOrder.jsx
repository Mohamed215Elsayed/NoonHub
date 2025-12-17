import { Row } from "react-bootstrap";
import UserAllOrderItem from "./UserAllOrderItem";
import "./UserAllOrder.css";

function UserAllOrder() {
  return (
    <div>
      <div className="admin-content-text pb-4">اهلا محمد السيد</div>
      <Row className="justify-content-between">
        <UserAllOrderItem />
        <UserAllOrderItem />
        <UserAllOrderItem />
      </Row>
    </div>
  );
}

export default UserAllOrder;
