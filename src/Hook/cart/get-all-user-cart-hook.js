import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserCartItems } from '../../Features/Cart/CartSlice';

const GetAllUserCartHook = () => {
  const dispatch = useDispatch();
  const { cartItems, numOfCartItems, totalCartPrice, totalPriceAfterDiscount } =
    useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (token && user?.role === 'user') {
        await dispatch(getAllUserCartItems());
      }
    };

    fetchCart();
  }, [dispatch, user]);

  return {
    numOfCartItems,
    cartItems,
    totalCartPrice,
    totalPriceAfterDiscount,
  };
};

export default GetAllUserCartHook;
