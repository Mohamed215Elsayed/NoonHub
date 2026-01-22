// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addProductToCart, resetCartError} from "../../Features/Cart/CartSlice"
// import notify from '../useNotifaction';

// const AddToCartHook = (prodID, item) => {
//     const dispatch = useDispatch();
//     const { status, error, loading } = useSelector(state => state.cart);

//     const [indexColor, setIndexColor] = useState('');
//     const [colorText, setColorText] = useState('');
//     // const [localLoading, setLocalLoading] = useState(false);

//     const colorClick = (index, color) => {
//         setIndexColor(index);
//         setColorText(color);
//     };

//     const addToCartHandle = async () => {
//         if (item?.colors?.length > 0 && !colorText) {
//             notify("من فضلك اختر لوناً أولاً للمنتج", "warn");
//             return;
//         }
//         // setLocalLoading(true);
//         await dispatch(addProductToCart({
//             productId: prodID,
//             color: colorText
//         })).unwrap();
//         // setLocalLoading(false);

//     };
//     useEffect(() => {
//         if (status === 'success') {
//             notify('تمت إضافة المنتج للعربة بنجاح', 'success')
//             dispatch(resetCartError())
//             setTimeout(() => {
//                 window.location.reload(false)
//             }, 1000)
//         }

//         if (status === 'error') {
//             notify(error?.message || 'حدث خطأ أثناء الإضافة', 'error')
//             dispatch(resetCartError())
//         }
//     }, [status, error, dispatch])

//     return { colorClick, indexColor, addToCartHandle, loading };
// };

// export default AddToCartHook;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../Features/Cart/CartSlice';
import notify from '../useNotifaction';

const AddToCartHook = (prodID, item) => {
  const dispatch = useDispatch();

  const [indexColor, setIndexColor] = useState('');
  const [colorText, setColorText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Local Loading

  const colorClick = (index, color) => {
    setIndexColor(index);
    setColorText(color);
  };

  const addToCartHandle = async () => {
    if (item?.colors?.length > 0 && !colorText) {
      notify('من فضلك اختر لوناً أولاً للمنتج', 'warn');
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(
        addProductToCart({
          productId: prodID,
          color: colorText,
        })
      ).unwrap();
      notify('تمت إضافة المنتج للعربة بنجاح', 'success');
    } catch (error) {
      notify(error || 'حدث خطأ أثناء الإضافة', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    colorClick,
    indexColor,
    addToCartHandle,
    loading: isSubmitting,
  };
};

export default AddToCartHook;
