import { Row } from 'react-bootstrap';
import UserAllOrderItem from './UserAllOrderItem';
import './UserAllOrder.css';
import UserGetAllOrderHook from '../../../Hook/user/user-get-all-order-hook';
import Pagination from '../../Uitily/Pagination/Pagination';
import NoOrdersFound from './NoOrdersFound';

const UserAllOrder = () => {
  const { userName, orders, loading, getPage, pageCount, currentPage } =
    UserGetAllOrderHook();

  return (
    <>
      <div className="admin-content-text pb-4">اهلا {userName}</div>

      <Row className="justify-content-center">
        {loading ? (
          [1, 2, 3].map((n) => (
            <div key={n} className="col-12 mb-3">
              <div className="skeleton-loader">
                <div className="skeleton-text" style={{ width: '40%' }}></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text" style={{ width: '60%' }}></div>
              </div>
            </div>
          ))
        ) : orders && orders.length > 0 ? (
          orders.map((orderItem) => (
            <UserAllOrderItem key={orderItem._id} order={orderItem} />
          ))
        ) : (
          <NoOrdersFound text="أنت لم تقم بإجراء أي طلبات شراء بعد" />
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
};

export default UserAllOrder;
