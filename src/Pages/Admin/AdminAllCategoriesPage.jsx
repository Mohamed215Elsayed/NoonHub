import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar/AdminSideBar";
import AdminAllCategories from "../../Components/Admin/AdminAllCategories/AdminAllCategories";
import Pagination from "../../Components/Uitily/Pagination/Pagination";
import ViewCategoryAdminHook from "../../Hook/admin/ViewCategoryAdminHook";

const AdminAllCategoriesPage = () => {
  const { items, currentPage, pageCount, getPage, loading } = ViewCategoryAdminHook();

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="10" md="10">
          <AdminAllCategories
            categories={items}
            loading={loading}
            currentPage={currentPage}
          />
          {pageCount > 1 && (
            <Pagination onPress={getPage} currentPage={currentPage} pageCount={pageCount} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAllCategoriesPage;
