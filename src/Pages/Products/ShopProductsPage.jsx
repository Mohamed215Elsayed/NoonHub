import { Container, Row, Col } from "react-bootstrap";
import Pagination from "../../Components/Uitily/Pagination/Pagination";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import FilterDropDownCountResult from "../../Components/Uitily/FilterDropDownCountResult/FilterDropDownCountResult";
import SideFilter from "../../Components/Uitily/SideFilter/SideFilter";
import ViewSearchProductsHook from "../../Hook/product/view-search-products-hook";
function ShopProductsPage() {
  const [items, pageCount, currentPage, getPage, resultsCount] =
    ViewSearchProductsHook();
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />

      <Container>
        <FilterDropDownCountResult title={`هناك ${resultsCount} نتيجة بحث`} />

        <Row className="gx-5">
          <Col xs={12} lg={3} xl={2} className="d-none d-lg-block">
            <SideFilter />
          </Col>

          <Col xs={12} lg={9} xl={10}>
            <CardProductsContainer products={items} title="" btntitle="" />
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-5">
          {pageCount > 1 && (
            <Pagination
              pageCount={pageCount}
              onPress={getPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default ShopProductsPage;
