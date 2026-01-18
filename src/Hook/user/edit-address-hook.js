import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOneUserAddress,
  updateUserAddress,
  resetAddressStatus,
} from "../../Features/Addresses/UserAddressSlice";
import notify from "../useNotifaction";

const EditAddressHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { oneAddress, loading, status, error } = useSelector(
    (state) => state.userAddress
  );
  // console.log(oneAddress);
  const [formData, setFormData] = useState({
    alias: "",
    details: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  // ===== GET ADDRESS =====
  useEffect(() => {
    dispatch(getOneUserAddress(id));
  }, [dispatch, id]);

  // ===== FILL FORM AFTER FETCH =====
  useEffect(() => {
    if (oneAddress) {
      setFormData({
        alias: oneAddress.alias || "",
        details: oneAddress.details || "",
        phone: oneAddress.phone || "",
        city: oneAddress.city || "",
        postalCode: oneAddress.postalCode || "",
      });
    }
  }, [oneAddress]);

  // ===== HANDLE CHANGE =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validatePhone = (phone) => {
    const egyptRegex = /^01[0125][0-9]{8}$/;
    const saudiRegex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    return egyptRegex.test(phone) || saudiRegex.test(phone);
  };

  // ===== SUBMIT =====
  const onSubmit = async () => {
    const { alias, details, phone, city } = formData;

    if (!alias || !details || !phone || !city) {
      return notify("من فضلك أكمل جميع الحقول المطلوبة", "warn");
    }

    if (!validatePhone(phone.trim())) {
      return notify("رقم الهاتف غير صحيح (مصر أو السعودية)", "error");
    }

    await dispatch(updateUserAddress({ id, body: formData }));
  };

  // ===== HANDLE RESULT =====
  useEffect(() => {
    if (status === "updated") {
      notify("تم تحديث العنوان بنجاح", "success");
      dispatch(resetAddressStatus());
      navigate("/user/addresses");
    }

    if (error) {
      notify(error, "error");
      dispatch(resetAddressStatus());
    }
  }, [status, error, dispatch, navigate]);

  // ===== CLEANUP =====
  useEffect(() => {
    return () => {
      dispatch(resetAddressStatus());
    };
  }, [dispatch]);

  return { formData, handleChange, onSubmit, loading };
};

export default EditAddressHook;
