import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeOrder } from '../../Features/Orders/OrderSlice';
import notify from '../useNotifaction'; 

const useDeleteOrder = (orderId) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null); 
  };
  const handleShow = () => setShow(true);
const handleShowModal = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    handleShow();
};


  const handleDelete = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(removeOrder(orderId)).unwrap();
      setShow(false);
      notify('تم الحذف بنجاح', 'success');
    } catch (err) {
      setError(err?.message || 'فشل في حذف الطلب');
      notify(err?.message || 'فشل في حذف الطلب', 'error');
    } finally {
      setLoading(false);
    }
  }, [dispatch, orderId]);

  return { show,  handleClose, handleDelete, loading,handleShowModal };//handleShow,
};

export default useDeleteOrder;
