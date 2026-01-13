import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";

const ResetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const OnChangePassword = (e) => setPassword(e.target.value);
  const OnChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword((p) => !p);
  const toggleShowConfirm = () => setShowConfirm((p) => !p);


  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "weak";
    if (score === 2) return "medium";
    if (score >= 3) return "strong";
  };

  const passwordStrength =
  password.length === 0 ? "" : getPasswordStrength(password);


  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const onSubmit = async () => {
    if (!password || !confirmPassword) {
      notify("من فضلك ادخل كلمة السر كاملة", "error");
      return;
    }

    if (password !== confirmPassword) {
      notify("كلمتا السر غير متطابقتين", "error");
      return;
    }

    const res = await dispatch(
      resetPassword({
        email: localStorage.getItem("user-email"),
        newPassword: password,
      })
    );

    if (resetPassword.fulfilled.match(res)) {
      notify("تم تغيير كلمة السر بنجاح", "success");
      setTimeout(() => navigate("/login"), 1200);
    } else {
      notify("من فضلك اطلب كود جديد", "error");
    }
  };

  return {
    password,
    confirmPassword,
    OnChangePassword,
    OnChangeConfirmPassword,
    onSubmit,
    loading,
    showPassword,
    toggleShowPassword,
    passwordStrength,
    isPasswordMatch,
    showConfirm,
    toggleShowConfirm
  };
};

export default ResetPasswordHook;
