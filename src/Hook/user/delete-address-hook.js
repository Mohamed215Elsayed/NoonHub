import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserAddress } from "../../Features/Addresses/UserAddressSlice";
import notify from "../useNotifaction";

const DeleteAddressHook = (id) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    if (!loading) setShow(false);
  };

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(deleteUserAddress(id)).unwrap();
      notify("تم حذف العنوان بنجاح", "success");
      setShow(false);
    } catch (err) {
      notify(err || "فشل حذف العنوان", "error");
    } finally {
      setLoading(false);
    }
  }, [dispatch, id]);

  return { show, handleClose, handleShow, handleDelete, loading };
};

export default DeleteAddressHook;
