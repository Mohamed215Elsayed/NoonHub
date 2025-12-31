import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarPlaceholder from "../../Assets/Images/avatar.png";
import notify from "../useNotifaction";
import { createBrand } from "../../Features/Brands/BrandSlice";

const AddBrandHook = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [img, setImg] = useState(avatarPlaceholder);
  const [selectedFile, setSelectedFile] = useState(null);

  const loading = useSelector((state) => state.brands.loading);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImgUrl = URL.createObjectURL(e.target.files[0]);
      setImg(newImgUrl);
      setSelectedFile(e.target.files[0]);
    }
  };

  // تنظيف الذاكرة عند تغيير الصورة أو إغلاق الصفحة
  useEffect(() => {
    const currentImg = img;
    return () => {
      if (currentImg && currentImg.startsWith("blob:")) {
        URL.revokeObjectURL(currentImg);
      }
    };
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return notify("من فضلك أدخل اسم الماركة", "warn");
    if (!selectedFile) return notify("من فضلك اختر صورة", "warn");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectedFile);

    try {
      await dispatch(createBrand(formData)).unwrap();
      notify("تمت الإضافة بنجاح", "success");
      setName("");
      setImg(avatarPlaceholder);
      setSelectedFile(null);
    } catch (error) {
      const errorMsg = error?.message || "هناك مشكلة في عملية الإضافة";
      notify(errorMsg, "error");
    }
  };

  return [name, onChangeName, img, onImageChange, loading, handleSubmit];
};

export default AddBrandHook;
