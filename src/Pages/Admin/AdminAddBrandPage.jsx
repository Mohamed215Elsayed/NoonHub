import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar/AdminSideBar";
import AdminAddBrand from "../../Components/Admin/AdminAddBrand/AdminAddBrand";

function AdminAddBrandPage() {
  return (
    <Container style={{ minHeight: "670px" }}>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminAddBrand />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminAddBrandPage;
