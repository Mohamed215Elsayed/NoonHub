import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import notify from '../useNotifaction';
import {
  getOneCategory,
  updateCategory,
} from '../../Features/Categories/CategorySlice';

const EditCategoryHook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.categories.oneCategory.data);
  const loading = useSelector((state) => state.categories.loading);

  const [name, setName] = useState('');
  const [img, setImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 🟢 جلب بيانات التصنيف
  useEffect(() => {
    dispatch(getOneCategory(id));
  }, [dispatch, id]);

  // 🟢 تعبئة البيانات
  useEffect(() => {
    if (category?.image) {
      setName(category.name);
      setImg(category.image);
    } else if (category?.name) {
      setName(category.name);
    }
  }, [category]);

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

    if (!name.trim()) return notify('ادخل اسم التصنيف', 'warn');

    const formData = new FormData();
    formData.append('name', name);

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await dispatch(updateCategory({ id, formData })).unwrap();
      notify('تم تعديل التصنيف بنجاح', 'success');
      setTimeout(() => navigate('/admin/allcategories'), 1500);
    } catch (error) {
      const errorMsg = error?.message || 'حدث خطأ أثناء التعديل';
      notify(errorMsg, 'error');
    }
  };

  return [name, onChangeName, img, onImageChange, loading, handleSubmit];
};

export default EditCategoryHook;
