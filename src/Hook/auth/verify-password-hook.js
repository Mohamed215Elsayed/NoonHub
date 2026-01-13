// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyResetCode } from "../../Features/Auth/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import notify from "../useNotifaction";

// const VerifyPasswordHook = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading } = useSelector((state) => state.auth);

//   const [code, setCode] = useState("");

//   const onChangeCode = (e) => setCode(e.target.value);

//   const onSubmit = async () => {
//     if (!code.trim()) {
//       notify("من فضلك ادخل الكود", "error");
//       return;
//     }

//     try {
//       const data = await dispatch(
//         verifyResetCode({ resetCode: code })
//       ).unwrap();

//       if (data.status === "Success") {
//         notify("كود التفعيل صحيح", "success");
//         setTimeout(() => {
//           navigate("/user/reset-password");
//         }, 1000);
//       }
//     } catch (error) {
//       notify(
//         error?.message || "الكود خاطئ أو انتهت صلاحيته",
//         "error"
//       );
//     }
//   };

//   return {
//     code,
//     onChangeCode,
//     onSubmit,
//     loading,
//   };
// };

// export default VerifyPasswordHook;

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyResetCode } from "../../Features/Auth/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import notify from "../useNotifaction";

// const VerifyPasswordHook = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [code, setCode] = useState("");
//   const { loading } = useSelector((state) => state.auth);

//   const OnChangeCode = (e) => {
//     const value = e.target.value.replace(/\D/g, "");
//     setCode(value);
//   };

//   const onSubmit = async () => {
//     if (code.length !== 6) {
//       notify("من فضلك ادخل الكود كامل", "error");
//       return;
//     }

//     const res = await dispatch(verifyResetCode({ resetCode: code }));

//     if (verifyResetCode.fulfilled.match(res)) {
//       if (res.payload.status === "Success") {
//         notify("كود التفعيل صحيح", "success");
//         setTimeout(() => {
//           navigate("/user/reset-password");
//         }, 1200);
//       }
//     } else {
//       notify("الكود خاطئ او انتهت صلاحيته", "error");
//     }
//   };

//   return { code, OnChangeCode, onSubmit, loading };
// };

// export default VerifyPasswordHook;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetCode } from "../../Features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";

const VerifyPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const OnChangeCode = (e) => {
    setCode(e.target.value.replace(/\D/g, ""));
  };

  const onSubmit = async () => {
    if (code.length !== 6) {
      notify("من فضلك ادخل الكود كامل", "error");
      return;
    }

    const res = await dispatch(verifyResetCode({ resetCode: code }));

    if (verifyResetCode.fulfilled.match(res)) {
      notify("كود التفعيل صحيح", "success");
      setTimeout(() => {
        navigate("/user/reset-password");
      }, 1200);
    } else {
      notify("الكود خاطئ او انتهت صلاحيته", "error");
    }
  };

  return { code, OnChangeCode, onSubmit, loading };
};

export default VerifyPasswordHook;
