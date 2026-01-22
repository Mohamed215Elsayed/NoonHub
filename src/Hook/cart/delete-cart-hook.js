import { useState } from 'react';
import { useDispatch } from 'react-redux';
import notify from '../useNotifaction';
import {
  clearAllCartItem,
  deleteCartItem,
  getAllUserCartItems,
} from '../../Features/Cart/CartSlice';

const DeleteCartHook = (item) => {
  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // مسح العربة بالكامل
  const handleDeleteCart = async () => {
    setIsDeleting(true);
    try {
      await dispatch(clearAllCartItem()).unwrap();
      notify('تم مسح العربة بنجاح', 'success');
    } catch (error) {
      notify(error || 'حدث خطأ أثناء المسح', 'error');
    }
    setIsDeleting(false);
  };

  // حذف منتج واحد
  const handelDeleteItem = async () => {
    if (!item?._id) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteCartItem(item._id)).unwrap();
      notify('تم حذف المنتج بنجاح', 'success');
      setShow(false);
      await dispatch(getAllUserCartItems());
    } catch (error) {
      notify(error || 'فشل حذف المنتج', 'error');
    }
    setIsDeleting(false);
  };

  return {
    handleDeleteCart,
    show,
    handleClose,
    handleShow,
    handelDeleteItem,
    isDeleting,
  };
};

export default DeleteCartHook;
