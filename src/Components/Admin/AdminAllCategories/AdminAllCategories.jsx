import { Row, Col } from "react-bootstrap";
import AdminAllCategoriesCard from "./AdminAllCategoriesCard";
import "./AdminAllCategories.css";
import CategorySkeleton from "./../../Uitily/Skelton/CategorySkeleton";
import CategoryEmptyState from "./../../Uitily/CategoryEmptyState";

function AdminAllCategories({ categories, loading, currentPage }) {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع التصنيفات</div>
      <Row className="justify-content-start">
        {loading ? (
          <div className="d-flex justify-content-center w-100 my-5">
            <CategorySkeleton count={3} />
          </div>
        ) : categories && categories.length > 0 ? (
          categories.map((item) => (
            <AdminAllCategoriesCard
              key={item._id}
              item={item}
              currentPage={currentPage}
            />
          ))
        ) : (
          <Col xs="12" className="text-center my-5">
            <CategoryEmptyState />
            <h4 className="mt-3">لا يوجد تصنيفات حالياً</h4>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default AdminAllCategories;
