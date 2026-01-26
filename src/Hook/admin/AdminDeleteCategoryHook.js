import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCategory, getAllCategoryPage } from "../../Features/Categories/CategorySlice";
import notify from "../useNotifaction";

const AdminDeleteCategoryHook = (category, currentPage) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteCategory(category._id)).unwrap();
      notify("تم حذف التصنيف بنجاح", "success");
      dispatch(getAllCategoryPage(currentPage));
      setLoading(false);
      setShow(false);
    } catch (error) {
      notify(error?.message || "حدث خطأ أثناء الحذف", "error");
      setLoading(false);
    }
  };

  return [show, handleClose, handleShow, handelDelete, loading];
};

export default AdminDeleteCategoryHook;
