import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar/AdminSideBar";
import AdminAllProducts from "../../Components/Admin/AdminAllProducts/AdminAllProducts";
import Pagination from "../../Components/Uitily/Pagination/Pagination";

function AdminAllProductsPage() {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminAllProducts />
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminAllProductsPage;
