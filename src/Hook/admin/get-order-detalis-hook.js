import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneOrder } from '../../Features/Orders/OrderSlice';

const GetOrderDetailsHook = (orderId) => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orders.orderDetails);

  useEffect(() => {
    if (orderId) {
      dispatch(getOneOrder(orderId));
    }
  }, [dispatch, orderId]);

  const orderData = orderDetails || {};
  const cartItems = orderDetails?.cartItems || [];

  return {
    orderData,
    cartItems,
  };
};

export default GetOrderDetailsHook;
//   console.log(orderDetails);
/*
{shippingAddress: {…}, _id: '69790098b71f73c5e77f2015', user: {…}, cartItems: Array(2), taxPrice: 0, …}
cartItems: (2) [{…}, {…}]
createdAt: "2026-01-27T18:14:48.518Z"
deliveredAt: "2026-01-29T01:34:03.450Z"
isDelivered: true
isPaid: true
paidAt: "2026-01-29T01:33:47.284Z"
paymentMethodType: "cash"
shippingAddress: {details: 'العمل', phone: '01027305928', city: 'Tanta', postalCode: '04025'}
shippingPrice: 0
taxPrice: 0
totalOrderPrice: 30044
updatedAt: "2026-01-29T01:34:03.451Z"
user: {_id: '6968f65cb71e5f1139d4c084', name: 'Test11', email: 'test11@gmail.com', phone: '01027305928', profileImg: 'http://localhost:8000/uploads/users/user-profile-d…a4-1943-43dc-8aab-43609ac4bc13-1768678647449.jpeg'}
__v: 0
_id: "69790098b71f73c5e77f2015"
*/
