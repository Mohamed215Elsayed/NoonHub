// import { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, clearError } from "../../Features/Auth/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import notify from "../useNotifaction";

// const LoginHook = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const togglePassword = useCallback(() => {
//     setShowPassword((prev) => !prev);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading) return;

//     try {
//       await dispatch(loginUser(formData)).unwrap();
//       notify("تم تسجيل الدخول بنجاح", "success");
//       navigate("/");
//     } catch (err) {
//       if (err?.errors && Array.isArray(err.errors)) {
//         err.errors.forEach((e) => notify(e.msg, "error"));
//       } else if (err?.message) {
//         notify(err.message, "error");
//       } else {
//         notify("حدث خطأ أثناء تسجيل الدخول", "error");
//       }
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       notify(error, "error");
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   return {
//     formData,
//     handleChange,
//     showPassword,
//     togglePassword,
//     handleSubmit,
//     loading,
//   };
// };

// export default LoginHook;
/*=============RHF+Zod===========*/
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../Features/Auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import notify from '../useNotifaction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAllUserCartItems } from '../../Features/Cart/CartSlice';
// تحديد قواعد التحقق باستخدام Zod
const loginSchema = z.object({
  email: z
    .string()
    .email('البريد الإلكتروني غير صحيح')
    .min(1, 'البريد الإلكتروني مطلوب'),
  password: z.string().min(6, 'كلمة المرور يجب أن لا تقل عن 6 أحرف'),
});

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // إعداد RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      const userRole = res?.data?.role;
      if (userRole === 'user') {
        try {
          await dispatch(getAllUserCartItems()).unwrap();
        } catch {}
      }

      notify('تم تسجيل الدخول بنجاح', 'success');

      if (userRole === 'admin' || userRole === 'manager') {
        navigate('/admin/allorders');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (Array.isArray(err?.errors)) {
        err.errors.forEach((e) => notify(e.msg, 'error'));
      } else {
        notify(err?.message || 'حدث خطأ ما', 'error');
      }
    }
  };

  useEffect(() => {
    if (error) {
      notify(error, 'error');
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return {
    register,
    handleSubmit,
    onSubmit,
    showPassword,
    togglePassword,
    errors,
    loading,
  };
};

export default LoginHook;
