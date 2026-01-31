// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getAllUserCartItems } from '../../Features/Cart/CartSlice';

// const GetAllUserCartHook = () => {
//   const dispatch = useDispatch();
//   const [cartID, setCartID] = useState('0');

//   const { cartItems, numOfCartItems, totalCartPrice, totalPriceAfterDiscount } =
//     useSelector((state) => state.cart);
//   const { user, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchCart = async () => {
//       if (!loading &&token && user?.role === 'user') {
//         const result = await dispatch(getAllUserCartItems());
//         if (result?.payload?.status === 'success') {
//           setCartID(result.payload.data._id);
//         }
//       }
//     };

//     fetchCart();
//   }, [dispatch, user?.role]);
//   if (user?.role === 'admin' || user?.role === 'manager') {
//     return { numOfCartItems: 0, cartItems: [], totalCartPrice: 0 };
//   }

//   return {
//     numOfCartItems: numOfCartItems || 0,
//     cartItems: cartItems || [],
//     totalCartPrice: totalCartPrice || 0,
//     totalPriceAfterDiscount: totalPriceAfterDiscount || 0,
//     cartID,
//   };
// };

// export default GetAllUserCartHook;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserCartItems } from '../../Features/Cart/CartSlice';

const GetAllUserCartHook = () => {
  const dispatch = useDispatch();
  const [cartID, setCartID] = useState('0');

  const { cartItems, numOfCartItems, totalCartPrice, totalPriceAfterDiscount } =
    useSelector((state) => state.cart);
  
  // نراقب حالة الـ loading الخاصة بالـ Auth للتأكد من استقرار بيانات المستخدم
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchCart = async () => {
      // 🟢 التعديل الجوهري: لا ترسل طلب إلا إذا انتهى تحميل المستخدم وتأكدنا أنه "user"
      if (!authLoading && token && user?.role === 'user') {
        const result = await dispatch(getAllUserCartItems());
        if (result?.payload?.status === 'success' && result.payload.data) {
          setCartID(result.payload.data._id);
        }
      }
    };

    fetchCart();
    // أضفنا authLoading للمراقبة
  }, [dispatch, user?.role, authLoading]);

  // تصفير العربة للأدمن أو لو مفيش مستخدم مسجل أصلاً
  if (user?.role === 'admin' || user?.role === 'manager') {
    return { 
      numOfCartItems: 0, 
      cartItems: [], 
      totalCartPrice: 0, 
      totalPriceAfterDiscount: 0, 
      cartID: '0' 
    };
  }

  return {
    numOfCartItems: numOfCartItems || 0,
    cartItems: cartItems || [],
    totalCartPrice: totalCartPrice || 0,
    totalPriceAfterDiscount: totalPriceAfterDiscount || 0,
    cartID,
  };
};

export default GetAllUserCartHook;