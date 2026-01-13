import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeCoupon } from "../../Features/Coupons/CouponSlice";
import notify from "../useNotifaction";

const CouponCardHook = (couponId) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    if (!loading) setShow(false);
  }, [loading]);

  const handleShow = useCallback(() => setShow(true), []);
  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(removeCoupon(couponId)).unwrap();
      notify("تم حذف الكوبون بنجاح", "success");
      setShow(false);
    } catch (error) {
      notify("حدث خطأ أثناء الحذف، حاول لاحقاً", "error");
    } finally {
      setLoading(false);
    }
  }, [dispatch, couponId]);

  return {
    show,
    handleClose,
    handleShow,
    handleDelete,
    loading,
  };
};

export default CouponCardHook;
