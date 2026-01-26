import { Container, Row, Col } from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar/AdminSideBar';
import AdminAllBrands from '../../Components/Admin/AdminAllBrands/AdminAllBrands';
import Pagination from '../../Components/Uitily/Pagination/Pagination';
import ViewBrandAdminHook from '../../Hook/admin/ViewBrandAdminHook';

const AdminAllBrandsPage = () => {
  const { items, currentPage, pageCount, getPage, loading } =
    ViewBrandAdminHook();

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminAllBrands
            brands={items}
            loading={loading}
            currentPage={currentPage}
          />
          {pageCount > 1 && (
            <Pagination
              onPress={getPage}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllBrandsPage;
