// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, clearError } from "../../Features/Auth/AuthSlice";
// import notify from "../useNotifaction";

// const RegisterHook = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     agreeTerms: false,
//   });

//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     confirmPassword: false,
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   // Handle input changes
//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }, []);

//   // Toggle password visibility
//   const togglePassword = useCallback((field) => {
//     setShowPassword((prev) => {
//       if (!(field in prev)) return prev;
//       return {
//         ...prev,
//         [field]: !prev[field],
//       };
//     });
//   }, []);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     if (formData.password !== formData.confirmPassword) {
//       notify("كلمتا المرور غير متطابقتين", "error");
//       return;
//     }
//     // Phone validation
//     if (formData.phone) {
//       const egyptPhone = /^(?:\+?20|0)?1[0125][0-9]{8}$/;
//       const saPhone = /^(?:\+?966)?5[0-9]{8}$/;
//       if (!egyptPhone.test(formData.phone) && !saPhone.test(formData.phone)) {
//         notify("رقم الهاتف غير صحيح — يجب أن يكون مصري أو سعودي", "error");
//         return;
//       }
//     }

//     if (!formData.agreeTerms) {
//       notify("يجب الموافقة على الشروط والأحكام", "error");
//       return;
//     }

//     try {
//       await dispatch(
//         registerUser({
//           name: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           passwordConfirm: formData.confirmPassword,
//           termsAccepted: formData.agreeTerms,
//         })
//       ).unwrap();

//       notify("تم إنشاء الحساب بنجاح", "success");
//       setFormData({
//         //(مفيدة لو غيرت redirect لاحقًا)
//         fullName: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         agreeTerms: false,
//       });

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       // الأخطاء كلها من الباك اند
//       if (err?.errors && Array.isArray(err.errors)) {
//         err.errors.forEach((e) => notify(e.msg, "error"));
//       } else if (err?.message) {
//         notify(err.message, "error");
//       } else {
//         notify("حدث خطأ أثناء التسجيل", "error");
//       }
//     }
//   };

//   // Clear Redux error when component unmounts
//   useEffect(() => {
//     if (error) {
//       notify(error, "error");
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   return {
//     formData,
//     handleChange,
//     handleSubmit,
//     showPassword,
//     togglePassword,
//     loading,
//     error,
//   };
// };

// export default RegisterHook;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../Features/Auth/AuthSlice";
import notify from "../useNotifaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Validation/registerSchema";

const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreeTerms: false },
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        registerUser({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          passwordConfirm: data.confirmPassword,
          termsAccepted: data.agreeTerms,
        })
      ).unwrap();

      notify("تم إنشاء الحساب بنجاح", "success");
      reset();
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      notify(err?.message || "حدث خطأ في التسجيل", "error");
    }
  };

  useEffect(() => {
    if (error) {
      notify(error, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    showPassword,
    togglePassword,
  };
};

export default RegisterHook;
