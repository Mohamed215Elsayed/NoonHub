import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserCartItems } from '../../Features/Cart/CartSlice';

const GetAllUserCartHook = () => {
  const dispatch = useDispatch();
  const {
    cartItems,
    numOfCartItems,
    totalCartPrice,
    totalPriceAfterDiscount,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCart = async () => {
      await dispatch(getAllUserCartItems());
    };
    fetchCart();
  }, [dispatch]);


  return {
    numOfCartItems,
    cartItems,
    totalCartPrice,
    totalPriceAfterDiscount,
  };
};

export default GetAllUserCartHook;
