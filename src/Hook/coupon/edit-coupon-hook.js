import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOneCoupon,
  updateCoupon,
  resetCouponStatus,
} from "../../Features/Coupons/CouponSlice";
import notify from "../useNotifaction";

const EditCouponHook = (id) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { oneCoupon, createStatus, loading } = useSelector(
    (state) => state.coupons
  );

  // 1. جلب بيانات الكوبون عند تحميل الصفحة
  useEffect(() => {
    const get = async () => {
      await dispatch(getOneCoupon(id));
    };
    get();
  }, [id, dispatch]);

  // دالة لتحويل التاريخ لصيغة YYYY-MM-DD ليفهمها الـ Input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // 2. توزيع البيانات في الحقول فور وصولها
  useEffect(() => {
    if (oneCoupon) {
      setCouponName(oneCoupon.name);
      setCouponDate(formatDateForInput(oneCoupon.expire));
      setCouponValue(oneCoupon.discount);
    }
  }, [oneCoupon]);

  const onChangeName = (e) => setCouponName(e.target.value);
  const onChangeDate = (e) => setCouponDate(e.target.value);
  const onChangeValue = (e) => setCouponValue(e.target.value);

  // 3. تنفيذ التعديل
  const onSubmit = async () => {
    if (couponName === "" || couponDate === "" || couponValue <= 0) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    setIsSubmitting(true);
    await dispatch(
      updateCoupon({
        id: id,
        body: {
          name: couponName,
          expire: couponDate,
          discount: couponValue,
        },
      })
    );
    setIsSubmitting(false);
  };

  // 4. مراقبة حالة النجاح
  useEffect(() => {
    if (!isSubmitting && createStatus === 200) {
      notify("تمت عملية التعديل بنجاح", "success");
      setTimeout(() => {
        navigate("/admin/addcoupon");
      }, 1000);
      dispatch(resetCouponStatus());
    } else if (
      !isSubmitting &&
      createStatus &&
      createStatus !== 200 &&
      createStatus !== 201
    ) {
      // notify("فشلت عملية التعديل", "error")
      // dispatch(resetCouponStatus())
    }
  }, [createStatus, isSubmitting]);

  return {
    couponName,
    couponDate,
    couponValue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    loading,
  };
};

export default EditCouponHook;

/*
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCoupon, editCoupon, getAllCoupon, getOneCoupon } from '../../redux/actions/couponAction';
import notify from './../useNotifaction';

const EditCouponHook = (id) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [coupnName, setCoupnName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState(true)

    const oneCoupon = useSelector(state => state.couponReducer.oneCoupon)

    useEffect(() => {
        const get = async () => {
            setLoadingData(true)
            await dispatch(getOneCoupon(id))
            setLoadingData(false)
        }
        get();
    }, [])

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    useEffect(() => {
        if (loadingData === false) {
            if (oneCoupon.data) {
                setCoupnName(oneCoupon.data.name)
                setCouponDate(formatDate(oneCoupon.data.expire))
                setCouponValue(oneCoupon.data.discount)
            }
        }
    }, [loadingData])



    const onChangeName = (event) => {
        event.persist();
        setCoupnName(event.target.value)
    }

    const onChangeDate = (event) => {
        event.persist();
        setCouponDate(event.target.value)

    }
    const onChangeValue = (event) => {
        event.persist();
        setCouponValue(event.target.value)
    }

    const onSubmit = async () => {
        if (coupnName === "" || couponDate === "" || couponValue <= 0) {
            notify("من فضلك اكمل البيانات", "warn")
            return
        }
        setLoading(true)
        await dispatch(editCoupon(id, {
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.editCoupon)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت عملية التعديل بنجاح", "success")
                setTimeout(() => {
                    navigate('/admin/addcoupon')
                }, 1000);
            } else {
                notify("فضل عملية التعديل ", "error")
            }

        }

    }, [loading])



    return [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit]
}


export default EditCouponHook
*/
