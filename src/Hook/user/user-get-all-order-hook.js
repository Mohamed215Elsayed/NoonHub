import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../Features/Orders/OrderSlice';

const UserGetAllOrderHook = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || '';

  const { orders, loading } = useSelector((state) => state.orders); //results,

  useEffect(() => {
    dispatch(getAllOrders({ page: 1, limit: 3 }));
  }, [dispatch]);

  const getPage = (page) => {
    dispatch(getAllOrders({ page, limit: 3 }));
  };
  const pageCount = orders?.pagination?.numberOfPages || 0;
  const currentPage = orders?.pagination?.currentPage || 0;

  return {
    userName,
    orders: orders.data,
    loading,
    getPage,
    pageCount,
    currentPage,
  };
};

export default UserGetAllOrderHook;
