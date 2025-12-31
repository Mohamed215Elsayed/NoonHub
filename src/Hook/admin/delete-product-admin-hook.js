import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProducts,
  getAllProductsPage,
} from "../../Features/Products/ProductSlice";
import notify from "../useNotifaction";

const AdminDeleteProductHook = (item, currentPage) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);

  const handelDelete = async () => {
    try {
      await dispatch(deleteProducts(item._id)).unwrap();
      setShow(false);
      notify("تم حذف المنتج بنجاح", "success");
      await dispatch(getAllProductsPage({ page: currentPage, limit: 8 }));
    } catch (error) {
      const serverMsg = error?.message || "حدث خطأ في عملية الحذف";
      notify(serverMsg, "error");
    }
  };

  return [show, handleClose, handleShow, handelDelete, loading];
};

export default AdminDeleteProductHook;
