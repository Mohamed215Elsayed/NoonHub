import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOneCoupon,
  updateCoupon,
  resetCouponStatus,
} from "../../Features/Coupons/CouponSlice";

import notify from "../useNotifaction";

const EditCouponHook = (id) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { oneCoupon } = useSelector((state) => state.coupons);

  useEffect(() => {
    dispatch(getOneCoupon(id));
  }, [id, dispatch]);

  const formatDateForInput = useCallback((dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    if (!oneCoupon) return;

    setCouponName(oneCoupon.name ?? "");
    setCouponDate(formatDateForInput(oneCoupon.expire));
    setCouponValue(oneCoupon.discount ?? "");
  }, [oneCoupon, formatDateForInput]);

  const onChangeName = useCallback((e) => setCouponName(e.target.value), []);
  const onChangeDate = useCallback((e) => setCouponDate(e.target.value), []);
  const onChangeValue = useCallback((e) => setCouponValue(e.target.value), []);

  const onSubmit = useCallback(async () => {
    if (isSubmitting) return;

    const trimmedName = couponName.trim();
    const today = new Date().toISOString().split("T")[0];

    if (!trimmedName) {
      return notify("يجب إدخال اسم الكوبون", "warn");
    }
    if (!couponDate) {
      return notify("يجب تحديد تاريخ الانتهاء", "warn");
    }
    if (couponDate < today) {
      return notify("لا يمكن اختيار تاريخ قديم", "warn");
    }
    if (couponValue <= 0 || couponValue > 100) {
      return notify("نسبة الخصم يجب أن تكون بين 1 و 100", "warn");
    }

    try {
      setIsSubmitting(true);

      await dispatch(
        updateCoupon({
          id,
          body: {
            name: trimmedName,
            expire: couponDate,
            discount: Number(couponValue),
          },
        })
      ).unwrap();

      notify("تمت عملية التعديل بنجاح", "success");
      navigate("/admin/addcoupon");
      //   setTimeout(() => navigate("/admin/addcoupon"), 1000);
    } catch (err) {
      notify(err?.message || "فشلت عملية التعديل", "error");
    } finally {
      setIsSubmitting(false);
      dispatch(resetCouponStatus());
    }
  }, [
    couponName,
    couponDate,
    couponValue,
    isSubmitting,
    dispatch,
    navigate,
    id,
  ]);

  return {
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    isSubmitting,
  };
};

export default EditCouponHook;
