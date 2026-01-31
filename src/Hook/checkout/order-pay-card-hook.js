// import { createOrderCard } from '../../Features/Checkout/CheckoutSlice';
// import GetAllUserCartHook from '../cart/get-all-user-cart-hook';
// import { useDispatch } from 'react-redux';
// import notify from '../useNotifaction';

// const OrderPayCardHook = (addressDetails) => {
//   const dispatch = useDispatch();
//   const { cartID } = GetAllUserCartHook();

//   const handleCreateOrderCard = async () => {
//     if (cartID === '0') return notify('العربة فارغة', 'warn');
//     if (!addressDetails) return notify('اختر عنواناً أولاً', 'warn');
//     try {
//       const res = await dispatch(
//         createOrderCard({
//           cartId: cartID,
//           body: {
//             shippingAddress: {
//               details: addressDetails.alias,
//               phone: addressDetails.phone,
//               city: addressDetails.city || '',
//               postalCode: addressDetails.postalCode || '',
//             },
//           },
//         })
//       ).unwrap();
//     //   console.log(res)
//       if (res.status === 'success' && res.session?.url) {
//         notify('جاري الانتقال لصفحة الدفع الآمنة...', 'success');
//         window.location.href = res?.session?.url;
//       }
//     //   console.log(res)
//     } catch (err) {
//       notify(err?.message || 'فشل الاتصال ببوابة الدفع', 'error');
//     }
//   };

//   return { handleCreateOrderCard };
// };
// export default OrderPayCardHook;
import { useState } from 'react';
import { createOrderCard } from '../../Features/Checkout/CheckoutSlice';
import GetAllUserCartHook from '../cart/get-all-user-cart-hook';
import { useDispatch } from 'react-redux';
import notify from '../useNotifaction';

const OrderPayCardHook = () => { // شيلنا addressDetails من هنا
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartID } = GetAllUserCartHook();

  const handleCreateOrderCard = async (addressDetails) => { // هنستلم العنوان هنا
    if (cartID === '0') return notify('العربة فارغة', 'warn');
    if (!addressDetails || !addressDetails.alias) return notify('من فضلك اختر عنواناً للشحن أولاً', 'warn');
    
    setIsSubmitting(true);
    try {
      const res = await dispatch(
        createOrderCard({
          cartId: cartID,
          body: {
            shippingAddress: {
              details: addressDetails.alias,
              phone: addressDetails.phone,
              city: addressDetails.city || '',
              postalCode: addressDetails.postalCode || '',
            },
          },
        })
      ).unwrap();

      if (res.status === 'success' && res.session?.url) {
        notify('جاري الانتقال لصفحة الدفع الآمنة...', 'success');
        // تأخير بسيط عشان المستخدم يلحق يشوف الرسالة
        setTimeout(() => {
          window.location.href = res.session.url;
        }, 1500);
      }
    } catch (err) {
      notify(err?.message || 'فشل الاتصال ببوابة الدفع', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleCreateOrderCard };
};

export default OrderPayCardHook;