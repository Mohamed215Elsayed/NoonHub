import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserAddress } from '../../Features/Addresses/UserAddressSlice';
import {
  createOrderCash,
  resetCheckoutState,
} from '../../Features/Checkout/CheckoutSlice';
import GetAllUserCartHook from '../cart/get-all-user-cart-hook';
import notify from '../useNotifaction';
import { useNavigate } from 'react-router-dom';
import { clearCartState } from '../../Features/Cart/CartSlice';

const OrderPayCashHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressDetails, setAddressDetails] = useState(null); //as object of address
  const [payMethod, setPayMethod] = useState('');

  const handlePayMethod = (e) => {
    setPayMethod(e.target.value);
  };
  /* Choose Address*/
  const handleChooseAddress = async (e) => {
    const addressId = e.target.value;
    if (addressId === '0') {
      setAddressDetails(null);
      return;
    }
    const res = await dispatch(getOneUserAddress(addressId));
    if (res?.payload?.status === 'success') {
      setAddressDetails(res.payload.data);
    }
  };

  const { cartID, totalCartPrice, totalPriceAfterDiscount } =
    GetAllUserCartHook();
  const { order, loading, error } = useSelector((state) => state.checkout);

  /* Create Order*/
  const handleCreateOrderCash = async () => {
    if (cartID === '0') {
      notify('من فضلك أضف منتجات إلى العربة أولاً', 'warn');
      return;
    }
    if (!payMethod) {
      return notify('من فضلك اختر طريقة دفع', 'warn');
    }
    if (!addressDetails?._id) {
      notify('من فضلك اختر عنوان الشحن', 'warn');
      return;
    }
    if (payMethod === 'cash') {
      dispatch(
        createOrderCash({
          cartId: cartID,
          body: {
            shippingAddress: {
              details: addressDetails.alias,
              phone: addressDetails.phone,
              city: addressDetails.city || '',
              postalCode: addressDetails.postalCode || '',
            },
          },
        })
      );
    }
    //  else if (payMethod === 'card') {
    //   //   console.log('وصلنا لشرط البطاقة');
    //   notify('طريقة الدفع بالبطاقة ستتوفر قريباً', 'info');
    // } else {
    //   //   console.log('القيمة الحالية هي: ', payMethod);
    // }
  };

  useEffect(() => {
    if (!loading && order && order.status === 'success') {
      notify('تم إنشاء طلبك بنجاح', 'success');
      dispatch(clearCartState()); // clear cart state after order created successfully
      setTimeout(() => {
        navigate('/user/allorders');
        dispatch(resetCheckoutState());
      }, 1500);
    }

    if (!loading && error) {
      notify(error, 'error');
    }
  }, [loading, order, error, dispatch, navigate]);

  return {
    handleChooseAddress,
    handleCreateOrderCash,
    loading,
    handlePayMethod,
    totalCartPrice,
    totalPriceAfterDiscount,
    addressDetails,
    payMethod
  };
};

export default OrderPayCashHook;
