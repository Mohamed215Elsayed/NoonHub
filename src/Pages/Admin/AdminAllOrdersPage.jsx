import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar/AdminSideBar";
import Pagination from "../../Components/Uitily/Pagination/Pagination";
import AdminAllOrders from "../../Components/Admin/Orders/AdminAllOrders";
const AdminAllOrdersPage = () => {
  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminAllOrders />
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllOrdersPage;
