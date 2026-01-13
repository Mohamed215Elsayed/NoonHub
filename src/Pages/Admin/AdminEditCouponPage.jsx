import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar/AdminSideBar";
import AdminEditCoupon from "../../Components/Admin/AdminEditCoupon/AdminEditCoupon";

function AdminEditCouponPage() {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminEditCoupon />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditCouponPage;
