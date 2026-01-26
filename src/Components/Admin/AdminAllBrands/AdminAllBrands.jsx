import { Row, Col } from 'react-bootstrap';
import AdminAllBrandsCard from './AdminAllBrandsCard';
import './AdminAllBrands.css';
import CategorySkeleton from './../../Uitily/Skelton/CategorySkeleton';
import CategoryEmptyState from './../../Uitily/CategoryEmptyState';

function AdminAllBrands({ brands, loading, currentPage }) {
  return (
    <div>
      <div className="admin-content-text">ادارة جميع الماركات</div>
      <Row className="justify-content-start">
        {loading ? (
          <div className="d-flex justify-content-center w-100 my-5">
            <CategorySkeleton count={3} />
          </div>
        ) : brands && brands.length > 0 ? (
          brands.map((item) => (
            <AdminAllBrandsCard
              key={item._id}
              item={item}
              currentPage={currentPage}
            />
          ))
        ) : (
          <Col xs="12" className="text-center my-5">
            <CategoryEmptyState />
            <h4 className="mt-3">لا يوجد ماركات حالياً</h4>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default AdminAllBrands;
