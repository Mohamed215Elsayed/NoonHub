import { Container, Row, Col } from "react-bootstrap";
import Pagination from "../../Components/Uitily/Pagination/Pagination";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import FilterDropDownCountResult from "../../Components/Uitily/FilterDropDownCountResult/FilterDropDownCountResult";
import SideFilter from "../../Components/Uitily/SideFilter/SideFilter";

function ShopProductsPage() {
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />

      <Container>
        <FilterDropDownCountResult title="400 نتيجة بحث" />

        <Row className="gx-5">
          {/* الـ Sidebar */}
          <Col xs={12} lg={3} xl={2} className="d-none d-lg-block">
            <SideFilter />
          </Col>

          {/* المنتجات */}
          <Col xs={12} lg={9} xl={10}>
            <CardProductsContainer  title="" btntitle=""/>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-5">
          <Pagination
            pageCount={20}
            onPageChange={(page) => console.log(page)}
          />
        </div>
      </Container>
    </div>
  );
}

export default ShopProductsPage;

/*
<Col xs={12} md={4} lg={3} xl={2} className="mb-4 mb-lg-0">
  <SideFilter />
</Col>
<Col xs={12} md={8} lg={9} xl={10}>
  <CardProductsContainer />
</Col>
*/
