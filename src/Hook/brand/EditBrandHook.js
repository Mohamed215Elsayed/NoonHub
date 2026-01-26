import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import notify from '../useNotifaction';
import { getOneBrand, updateBrand } from '../../Features/Brands/BrandSlice';

const EditBrandHook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const brand = useSelector((state) => state.brands.oneBrand.data);
  const loading = useSelector((state) => state.brands.loading);

  const [name, setName] = useState('');
  const [img, setImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(brand);
  // 🟢 جلب بيانات البراند
  useEffect(() => {
    dispatch(getOneBrand(id));
  }, [dispatch, id]);

  // 🟢 تعبئة البيانات
  useEffect(() => {
    if (brand?.image) {
      setName(brand.name);
      setImg(brand.image);
    }
  }, [brand]);

  const onChangeName = (e) => setName(e.target.value);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImg(url);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return notify('ادخل اسم الماركة', 'warn');

    const formData = new FormData();
    formData.append('name', name);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await dispatch(updateBrand({ id, formData })).unwrap();
      notify('تم تعديل الماركة بنجاح', 'success');
      setTimeout(() => navigate('/admin/allbrands'), 1500);
    } catch (error) {
      const errorMsg = error?.message || 'حدث خطأ أثناء التعديل';
      notify(errorMsg, 'error');
    }
  };

  return [name, onChangeName, img, onImageChange, loading, handleSubmit];
};

export default EditBrandHook;
