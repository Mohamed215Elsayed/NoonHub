import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
const ForgetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const OnChangeEmail = (e) => setEmail(e.target.value);

  const onSubmit = async () => {
    if (!email.trim()) {
      notify("من فضلك ادخل الايميل", "error");
      return;
    }

    localStorage.setItem("user-email", email);

    try {
      const data = await dispatch(forgetPassword({ email })).unwrap();
      // data = { status, message }

      if (data.status === "Success") {
        notify("تم ارسال الكود للايميل بنجاح", "success");
        setTimeout(() => navigate("/user/verify-code"), 1000);
      }
      
    } catch (error) {
      notify(error?.message || "حدث خطأ، حاول مرة أخرى", "error");
    }
  };

  return { OnChangeEmail, email, onSubmit, loading };
};

export default ForgetPasswordHook;
