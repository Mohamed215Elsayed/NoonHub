import { Row } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import "./AdminAllProducts.css"
function AdminAllProducts() {
  return (
    <div>
      <div className="admin-content-text ">ادارة جميع المنتجات</div>
      <Row className="justify-content-start">
        <AdminAllProductsCard />
        <AdminAllProductsCard />
        <AdminAllProductsCard />
        <AdminAllProductsCard />
        <AdminAllProductsCard />
        <AdminAllProductsCard />
        <AdminAllProductsCard />
      </Row>
    </div>
  );
}

export default AdminAllProducts;
