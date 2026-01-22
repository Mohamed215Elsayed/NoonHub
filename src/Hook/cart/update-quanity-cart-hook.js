import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUserCartItems, updateCartItem } from '../../Features/Cart/CartSlice';
import notify from '../useNotifaction';
const UpdateQuantityCartHook = (item) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (itemCount < 1) return notify('الكمية يجب أن تكون 1 على الأقل', 'warn');
    setIsUpdating(true);
    try {
      await dispatch(
        updateCartItem({
          id: item._id,
          body: { quantity: itemCount },
        })
      ).unwrap();

      notify('تم تحديث الكمية بنجاح', 'success');
      await dispatch(getAllUserCartItems());
    } catch (error) {
      notify(error || 'خطأ في التحديث', 'error');
      setItemCount(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };
  return { itemCount, setItemCount, handleUpdate, isUpdating };
};
export default UpdateQuantityCartHook;
