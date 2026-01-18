import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  getAllCoupons,
  resetCouponStatus,
} from "../../Features/Coupons/CouponSlice";
import notify from "../useNotifaction";

const AddCouponHook = () => {
  const dispatch = useDispatch();

  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { coupons, createStatus, loading } = useSelector(
    (state) => state.coupons
  );

  const onChangeName = (e) => setCouponName(e.target.value);
  const onChangeDate = (e) => setCouponDate(e.target.value);
  const onChangeValue = (e) => setCouponValue(e.target.value);

  const onSubmit = async () => {
    // 1. تنظيف البيانات
    const trimmedName = couponName.trim();
    const today = new Date().toISOString().split("T")[0]; // تاريخ اليوم بتنسيق YYYY-MM-DD

    // 2. الفاليديشين المحسن
    if (trimmedName === "") {
      return notify("يجب إدخال اسم الكوبون", "warn");
    }
    if (couponDate === "") {
      return notify("يجب تحديد تاريخ الانتهاء", "warn");
    }
    if (couponDate < today) {
      return notify("لا يمكن اختيار تاريخ قديم", "warn");
    }
    if (couponValue <= 0 || couponValue > 100) {
      return notify("نسبة الخصم يجب أن تكون بين 1 و 100", "warn");
    }
    setIsSubmitting(true);
    await dispatch(
      createCoupon({
        name: trimmedName,
        expire: couponDate,
        discount: couponValue,
      })
    );
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!isSubmitting && createStatus) {
      if (createStatus === 201) {
        notify("تمت اضافة الكوبون بنجاح", "success");
        setCouponName("");
        setCouponDate("");
        setCouponValue("");
      } else if (createStatus === 400) {
        notify("هذا الكوبون موجود من قبل أو البيانات غير صالحة", "error");
      } else if (createStatus === 403) {
        notify("أنت غير مسموح لك بالإضافة", "error");
      }
      dispatch(resetCouponStatus());
    }
  }, [createStatus, isSubmitting, dispatch]);

  // جلب الكوبونات عند فتح الصفحة
  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  return {
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    coupons,
    loading,
  };
};

export default AddCouponHook;
