import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyCouponCart } from '../../Features/Cart/CartSlice';
import notify from '../useNotifaction';

const ApplayCouponHook = () => {
  const dispatch = useDispatch();
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

  return { couponName, onChangeCoupon, handleSubmitCoupon, loading };
};

export default ApplayCouponHook;
