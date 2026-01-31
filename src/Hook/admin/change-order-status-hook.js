import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  changeOrderPay,
  changeOrderDeliver,
  getOneOrder,
} from '../../Features/Orders/OrderSlice';
import notify from '../useNotifaction';

const ChangeOrderStatusHook = (orderId) => {
  const dispatch = useDispatch();
  const { loadingChange } = useSelector((state) => state.orders);
  const [payValue, setPayValue] = useState('');
  const [deliverValue, setDeliverValue] = useState('');

  const onChangePayValue = (e) => {
    setPayValue(e.target.value);
  };

  const onChangeDeliverValue = (e) => {
    setDeliverValue(e.target.value);
  };
  const formatDate = useCallback((dateString) => {
    if (!dateString) return '---';
    const userLocale = 'ar-EG'; //|| navigator.language || 'en-US';
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = date - now;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    if (Math.abs(diffDay) < 2) {
      const rtf = new Intl.RelativeTimeFormat(userLocale, { numeric: 'auto' });
      if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
      if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
      if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
      return rtf.format(diffDay, 'day');
    }
    return new Intl.DateTimeFormat(userLocale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }, []);

  const changePayOrder = async (value) => {
    if (value !== 'true') {
      return notify('من فضلك اختر "تم الدفع" للتأكيد', 'warning');
    }
    try {
      await dispatch(changeOrderPay(orderId)).unwrap();
      notify('تم تحديث حالة الدفع بنجاح', 'success');

      dispatch(getOneOrder(orderId));
    } catch (err) {
      notify(err?.message || 'حدث خطأ أثناء تحديث الدفع', 'error');
    }
  };

  const changeDeliverOrder = async (value) => {
    if (value !== 'true') {
      return notify('من فضلك اختر "تم التوصيل" للتأكيد', 'warning');
    }
    try {
      await dispatch(changeOrderDeliver(orderId)).unwrap();
      notify('تم تحديث حالة التوصيل بنجاح', 'success');
      dispatch(getOneOrder(orderId));
    } catch (err) {
      notify(err?.message || 'حدث خطأ أثناء تحديث التوصيل', 'error');
    }
  };

  return {
    formatDate,
    onChangePayValue,
    onChangeDeliverValue,
    payValue,
    deliverValue,
    changePayOrder,
    changeDeliverOrder,
    loadingChange,
  };
};

export default ChangeOrderStatusHook;
