import { Row } from "react-bootstrap";
import './AdminAllOrders.css';
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import Pagination from '../../Uitily/Pagination/Pagination';
import UserGetAllOrderHook from '../../../Hook/user/user-get-all-order-hook';
import NoOrdersFound from '../../User/UserAllOrder/NoOrdersFound';

function AdminAllOrders() {
   const { orders, loading, getPage, pageCount, currentPage } =
     UserGetAllOrderHook();

  return (
    <>
      <div className="admin-content-text">ادارة جميع الطلبات</div>
      <Row className="justify-content-center">
        {loading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="col-12 mb-3">
              <div
                className="skeleton-loader"
                style={{ height: '120px' }}
              ></div>
            </div>
          ))
        ) : orders && orders.length > 0 ? (
          orders.map((order) => (
            <AdminAllOrdersItem key={order._id} order={order} />
          ))
        ) : (
          <NoOrdersFound text=" لا يوجد طلبات" />
        )}
      </Row>
      <div className="d-flex justify-content-center">
        {!loading && pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            onPress={getPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
}

export default AdminAllOrders;
