import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReviewOnProduct,
  resetUpdateReview,
  getAllReviewProduct,
} from "../../Features/Reviews/ReviewSlice";
import { getOneProduct } from "../../Features/Products/ProductSlice";
import notify from "../useNotifaction";

const EditRateHook = (currentReview) => {
  const dispatch = useDispatch();
  const { loadingUpdate } = useSelector((state) => state.reviews); //updateReviewRes, error

  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(currentReview?.title || "");
  const [ratings, setRatings] = useState(currentReview?.ratings || 0);

  useEffect(() => {
    setTitle(currentReview?.title || "");
    setRatings(currentReview?.ratings || 0);
  }, [currentReview?.title, currentReview?.ratings]);

  const handleShow = () => setShowEdit(true);
  const handleClose = useCallback(() => {
    setShowEdit(false);
    dispatch(resetUpdateReview());
  }, [dispatch]);

  const handleUpdate = async () => {
    if (!currentReview?._id || !currentReview?.product) return;

    const result = await dispatch(
      updateReviewOnProduct({
        id: currentReview._id,
        body: { title, ratings },
      })
    );

    if (updateReviewOnProduct.fulfilled.match(result)) {
      notify("تم تحديث التقييم بنجاح", "success");
      setShowEdit(false);
      dispatch(resetUpdateReview());

      dispatch(
        getAllReviewProduct({
          prodID: currentReview.product,
          page: 1,
          limit: 5,
        })
      );
      dispatch(getOneProduct(currentReview.product));

      // ---, الإضافة هنا لإجبار الصفحة على التحديث الكامل ---
      // setTimeout(() => {
      // window.location.reload();
      // }, 1000);
    } else {
      notify(
        result?.payload?.message || "تعذر تحديث التقييم، حاول مرة أخرى",
        "error"
      );
    }
  };

  return {
    showEdit,
    handleShow,
    handleClose,
    title,
    setTitle,
    ratings,
    setRatings,
    handleUpdate,
    loadingUpdate,
  };
};

export default EditRateHook;
