import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyCouponCart } from '../../Features/Cart/CartSlice';
import { useNavigate } from 'react-router-dom';
import notify from '../../Hook/useNotifaction';

const ApplayCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, appliedCoupon } = useSelector((state) => state.cart);
  const [couponName, setCouponName] = useState('');
  const onChangeCoupon = (e) => {
    setCouponName(e.target.value.trim());
  };

  useEffect(() => {
    if (appliedCoupon) {
      setCouponName(appliedCoupon);
    }
  }, [appliedCoupon]);

  const handleSubmitCoupon = async () => {
    if (couponName === '') {
      notify('من فضلك ادخل الكوبون', 'warn');
      return;
    }
    try {
      await dispatch(
        applyCouponCart({
          coupon: couponName,
        })
      ).unwrap();
      notify('تم تطبيق الكوبون بنجاح', 'success');
      // setCouponName('');
    } catch (error) {
      notify(error || 'هذا الكوبون غير صحيح أو منتهي الصلاحية', 'warn');
    }
  };
  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      notify('لا يمكن اتمام الشراء، السلة فارغة', 'warn');
      return;
    }
    navigate('/order/paymethoud');
  };

  return {
    couponName,
    onChangeCoupon,
    handleSubmitCoupon,
    handleCheckout,
    loading,
  };
};

export default ApplayCouponHook;
