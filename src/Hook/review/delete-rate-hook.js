import { deleteReviewOnProduct } from "../../Features/Reviews/ReviewSlice";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../useNotifaction";

const DeleteRateHook = (review) => {
  const dispatch = useDispatch();
  const { loadingDelete } = useSelector((state) => state.reviews);

  const menuRef = useRef(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleClose = useCallback(() => {
    setShowDelete(false);
  }, []);

  const handleShow = () => {
    setShowDelete(true);
    menuRef.current?.classList.remove("open");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = useMemo(
    () => user?._id === review?.user?._id,
    [user?._id, review?.user?._id]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(e.target)) {
        menuRef.current.classList.remove("open");
      }
    };

    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        menuRef.current?.classList.remove("open");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDelete = async () => {
    if (!review?._id) return;
    const result = await dispatch(deleteReviewOnProduct(review._id));
    if (deleteReviewOnProduct.fulfilled.match(result)) {
      notify("تم حذف التقييم بنجاح", "success");
      setShowDelete(false);
      // --- إضافة التحديث هنا ---
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const errorMessage =
        result?.payload?.message || "تعذر حذف التقييم، حاول مرة أخرى لاحقًا";
      notify(errorMessage, "error");
    }
  };

  return {
    showDelete,
    handleClose,
    handleShow,
    handleDelete,
    loadingDelete,
    isOwner,
    menuRef,
  };
};
export default DeleteRateHook;
