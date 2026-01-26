import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBrand, getAllBrandPage } from '../../Features/Brands/BrandSlice';
import notify from '../useNotifaction';

const AdminDeleteBrandHook = (brand, currentPage) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteBrand(brand._id)).unwrap();
      notify('تم حذف البراند بنجاح', 'success');
      dispatch(getAllBrandPage(currentPage));

      setLoading(false);
      setShow(false);
    } catch (error) {
      notify(error?.message || 'حدث خطأ أثناء الحذف', 'error');
      setLoading(false);
    }
  };

  return [show, handleClose, handleShow, handelDelete, loading];
};

export default AdminDeleteBrandHook;
