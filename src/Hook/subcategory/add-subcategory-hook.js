import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Features/Categories/CategorySlice";
import { createSubCategory } from "../../Features/SubCategories/SubCategorySlice";
import notify from "../useNotifaction";

const AddSubCategoryHook = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [id, setId] = useState("0");
  const onChangeName = (e) => setName(e.target.value);
  const onSelectCategory = (e) => setId(e.target.value);
  const loading = useSelector((state) => state.subCategories.loading);
  const categories = useSelector((state) => state.categories.category);
  useEffect(() => {
    dispatch(getAllCategory(100));
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // فحص الاتصال بالإنترنت // or use library react-detect-offline
    if (!navigator.onLine) {
      return notify("هناك مشكلة في الاتصال بالإنترنت", "warn");
    }
    if (!name.trim()) return notify("أدخل اسم التصنيف الفرعي", "warn");
    if (id === "0") return notify("اختر تصنيفاً رئيسياً أولاً", "warn");
    try {
      await dispatch(createSubCategory({ name, category: id })).unwrap();
      notify("تمت إضافة التصنيف الفرعي بنجاح", "success");
      setName("");
      setId("0");
    } catch (error) {
      const errorMsg =
        error?.errors?.[0]?.msg || error?.message || "حدث خطأ أثناء الإضافة";
      notify(errorMsg, "error");
    }
  };
  return [
    name,
    onChangeName,
    categories,
    loading,
    id,
    onSelectCategory,
    handleSubmit,
  ];
};
export default AddSubCategoryHook;
