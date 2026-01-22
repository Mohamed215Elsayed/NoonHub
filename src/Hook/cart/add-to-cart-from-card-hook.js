import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addProductToCart,
  getAllUserCartItems,
} from '../../Features/Cart/CartSlice';
import notify from '../useNotifaction';
import { getProductWishList } from '../../Features/WishList/wishListSlice';

const AddToCartFromCardHook = (product) => {
  const dispatch = useDispatch();

  const [showColorModal, setShowColorModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleShowColorModal = () => {
    setSelectedColor('');
    setShowColorModal(true);
  };

  const handleCloseColorModal = () => setShowColorModal(false);

  const handleAddToCart = async () => {
    if (product?.colors?.length > 0 && selectedColor === '') {
      return notify('من فضلك اختر لون المنتج أولاً قبل الإضافة للعربة', 'warn');
    }

    setIsAddingToCart(true);
    try {
      await dispatch(
        addProductToCart({
          productId: product._id,
          color: selectedColor,
        })
      ).unwrap();

      notify('تم إضافة المنتج إلى العربة بنجاح', 'success');
      handleCloseColorModal();
      await dispatch(getAllUserCartItems());
      await dispatch(getProductWishList());
    } catch (error) {
      notify(error || 'فشل إضافة المنتج', 'error');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return {
    showColorModal,
    selectedColor,
    setSelectedColor,
    handleShowColorModal,
    handleCloseColorModal,
    handleAddToCart,
    isAddingToCart,
  };
};

export default AddToCartFromCardHook;
