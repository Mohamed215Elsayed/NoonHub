import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../useNotifaction";
import {
  createReview,
  getAllReviewProduct,
  resetCreateReview,
} from "../../Features/Reviews/ReviewSlice";
import { getOneProduct } from "../../Features/Products/ProductSlice";

const AddRateHook = (prodID, pageSize = 5) => {
  const dispatch = useDispatch();

  const [rateText, setRateText] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { createReviewRes, loadingCreate, error } = useSelector(
    (state) => state.reviews
  );

  const user = useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const handleRateTextChange = useCallback(
    (e) => setRateText(e.target.value),
    []
  );

  const handleRateValueChange = useCallback((val) => setRateValue(val), []);

  const onSubmit = useCallback(() => {
    if (loadingCreate) return;

    if (!rateValue) return notify("من فضلك ضع تقييم بالنجوم", "error");
    if (!rateText.trim()) return notify("من فضلك اكتب تعليق", "error");

    setIsSubmitted(true);
    dispatch(
      createReview({
        prodID,
        body: { title: rateText, ratings: rateValue },
      })
    );
  }, [loadingCreate, rateValue, rateText, prodID, dispatch]);

  useEffect(() => {
    if (!isSubmitted || loadingCreate) return;

    if (createReviewRes) {
      notify("تمت اضافة التقييم بنجاح", "success");

      setRateText("");
      setRateValue(0);
      dispatch(resetCreateReview());
      // fetch reviews page 1 after add
      dispatch(getAllReviewProduct({ prodID, page: 1, limit: pageSize }));
      dispatch(getOneProduct(prodID));
      // --- إضافة التحديث هنا ---
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (error) {
      const message =
        error?.message || error?.data?.message || "حدث خطأ أثناء إضافة التقييم";

      if (error?.status === 403) {
        notify("غير مسموح للادمن بالتقييم", "error");
      } else if (error?.code === 11000 || message.includes("already added")) {
        notify("لقد قمت باضافة تقييم لهذا المنتج مسبقا", "error");
      } else {
        notify(message, "error");
      }
    }

    setIsSubmitted(false);
  }, [
    loadingCreate,
    createReviewRes,
    error,
    isSubmitted,
    prodID,
    dispatch,
    pageSize,
  ]);

  return {
    rateText,
    rateValue,
    user,
    handleRateTextChange,
    handleRateValueChange,
    onSubmit,
    loadingCreate,
  };
};

export default AddRateHook;
