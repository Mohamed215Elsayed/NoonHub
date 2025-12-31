import { useState, useEffect } from "react";
import avatarPlaceholder from "../../Assets/Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../Features/Categories/CategorySlice";
import notify from "../useNotifaction";

const AddCategoryHook = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(avatarPlaceholder);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useSelector((state) => state.categories.loading);
  // 1. تنظيف رابط المعاينة لمنع استهلاك الذاكرة
  useEffect(() => {
    return () => {
      if (img && img.startsWith("blob:")) {
        URL.revokeObjectURL(img);
      }
    };
  }, [img]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // تنظيف الرابط القديم قبل إنشاء واحد جديد
      if (img.startsWith("blob:")) URL.revokeObjectURL(img);

      setImg(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };
  // to handle the name
  const onChangeName = (e) => setName(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // التحقق من البيانات (Validation)
    if (!name.trim()) return notify("من فضلك أدخل اسم التصنيف", "warn");
    if (!selectedFile) return notify("من فضلك اختر صورة", "warn");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", selectedFile);

    try {
      await dispatch(createCategory(formData)).unwrap();

      notify("تمت عملية الإضافة بنجاح", "success");

      // إعادة تعيين الحقول
      setName("");
      setImg(avatarPlaceholder);
      setSelectedFile(null);
    } catch (error) {
      // إذا كان الخطأ مصفوفة (Validation Errors) أو رسالة نصية
      const errorMsg = error?.errors?.[0]?.msg || error?.message || "حدث خطأ أثناء الإضافة";
      notify(errorMsg, "error");
    }
  };
  return [img, name, loading, handleSubmit, onImageChange, onChangeName];
};
export default AddCategoryHook;
/*
إدارة الذاكرة (URL.revokeObjectURL):
 عندما نستخدم URL.createObjectURL لعمل معاينة للصورة،
  يقوم المتصفح بحجز مساحة في الذاكرة لهذه الصورة.
 من الضروري جداً استخدام revokeObjectURL عند تغيير الصورة أو عند إغلاق المكون لتجنب بطء المتصفح 
 (Memory Leak).*/
/*
لماذا نستخدم URL.revokeObjectURL؟
عندما تختار صورة من جهازك، يقوم المتصفح بإنشاء رابط مؤقت يبدأ بـ blob: لكي يتمكن من عرض الصورة داخل عنصر <img>. هذا الرابط يتم تخزينه في ذاكرة المتصفح (RAM).

مشكلة تراكم الذاكرة: إذا قام المستخدم بتغيير الصورة 10 مرات، سيقوم المتصفح بإنشاء 10 روابط مختلفة وحجز مساحة في الذاكرة لكل منها، ولن يتم مسحها تلقائياً إلا إذا أغلق المستخدم المتصفح تماماً.

وظيفة الكود: هذا الـ useEffect يعمل "كمنظف" (Cleanup function). في كل مرة تتغير فيها قيمة img أو يتم إغلاق المكون (Component unmount)، يقوم الكود بإخبار المتصفح: "لم نعد بحاجة لهذا الرابط، يمكنك الآن تفريغ هذه المساحة من الذاكرة".
*/
