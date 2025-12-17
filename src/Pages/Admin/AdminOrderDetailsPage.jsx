import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar/AdminSideBar";
import AdminOrderDetails from "../../Components/Admin/Orders/AdminOrderDetails";

function AdminOrderDetailsPage() {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminOrderDetails />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminOrderDetailsPage;
