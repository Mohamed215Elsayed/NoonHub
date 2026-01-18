import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  resetAddressStatus,
} from "../../Features/Addresses/UserAddressSlice";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";

const AddAddressHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userAddress);

  const [values, setValues] = useState({
    alias: "",
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // التحقق من صحة رقم الهاتف (مصر والسعودية)
  const validatePhone = (phone) => {
    // كود مصر: يبدأ بـ 01 ثم (0, 1, 2, 5) ثم 8 أرقام
    const egyptRegex = /^01[0125][0-9]{8}$/;
    // كود السعودية: يبدأ بـ 05 أو 5 ثم 8 أرقام
    const saudiRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    return egyptRegex.test(phone) || saudiRegex.test(phone);
  };

  const onSubmit = async (e) => {
    if (e) e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const { alias, details, phone, city, postalCode } = values;
    // 1. التأكد من تعبئة الحقول
    if (!alias.trim() || !details.trim() || !phone.trim() || !city.trim()) {
      return notify("من فضلك أكمل جميع البيانات الأساسية", "warn");
    }
    // 2. الفاليديشين الخاص بالهاتف
    if (!validatePhone(phone.trim())) {
      return notify("رقم الهاتف غير صحيح (يجب أن يكون مصري أو سعودي)", "error");
    }

    try {
      await dispatch(addUserAddress(values)).unwrap();
      notify("تمت إضافة العنوان بنجاح", "success");

      setTimeout(() => {
        navigate("/user/addresses");
        dispatch(resetAddressStatus());
      }, 800);
    } catch (err) {
      notify(err || "حدث خطأ أثناء إضافة العنوان", "error");
    }
  };

  // تنظيف الحالة عند مغادرة الصفحة
  useEffect(() => {
    return () => dispatch(resetAddressStatus());
  }, [dispatch]);

  return {
    ...values,
    handleChange,
    onSubmit,
    loading,
  };
};

export default AddAddressHook;
