import { Row, Col } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import "./AdminAllProducts.css";
import CategorySkeleton from "./../../Uitily/Skelton/CategorySkeleton";
import CategoryEmptyState from "./../../Uitily/CategoryEmptyState";

function AdminAllProducts({ products, loading, currentPage }) {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start">
        {loading ? (
          <div className="d-flex justify-content-center w-100 my-5">
            <CategorySkeleton count={3} />
          </div>
        ) : products && products.length > 0 ? (
          products.map((item, index) => (
            <AdminAllProductsCard
              key={item._id}
              item={item}
              currentPage={currentPage}
            />
          ))
        ) : (
          <Col xs="12" className="text-center my-5">
            <CategoryEmptyState />
            <h4 className="mt-3">لا يوجد منتجات حالياً</h4>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default AdminAllProducts;
