// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCategory } from "../../Features/Categories/CategorySlice";
// import { getAllBrand } from "../../Features/Brands/BrandSlice";
// import { getSubCategoryOnCategory } from "../../Features/SubCategories/SubCategorySlice";
// import {
//   getOneProduct,
//   updateProducts,
//   resetStatus,
// } from "../../Features/Products/ProductSlice";
// import notify from "./../useNotifaction";

// const AdminEditProductHook = (id) => {
//   const dispatch = useDispatch();

//   // Selectors
//   const item = useSelector((state) => state.products.oneProduct);
//   const category = useSelector((state) => state.categories.category);
//   const brand = useSelector((state) => state.brands.brand);
//   const subCat = useSelector(
//     (state) => state.subCategories.subCategoriesByCategory
//   );
//   const loadingSub = useSelector((state) => state.subCategories.loading);
//   const loadingProducts = useSelector((state) => state.products.loading);

//   // Form States
//   const [images, setImages] = useState({});
//   const [prodName, setProdName] = useState("");
//   const [prodDescription, setProdDescription] = useState("");
//   const [priceBefore, setPriceBefore] = useState("");
//   const [priceAfterDiscount, setpriceAfterDiscount] = useState("");
//   const [qty, setQty] = useState("");
//   const [catID, setCatID] = useState("0");
//   const [brandID, setBrandID] = useState("0");
//   const [colors, setColors] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [selectedSubID, setSelectedSubID] = useState([]);
//   const [showColorPickerList, setShowColorPickerList] = useState(false);

//   // 1. جلب البيانات الأساسية عند التحميل
//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(getOneProduct(id));
//       await dispatch(getAllCategory());
//       await dispatch(getAllBrand());
//     };
//     fetchData();
//   }, [dispatch, id]);

//   // 2. تعبئة الحقول الأساسية
//   useEffect(() => {
//     if (item?.data) {
//       setProdName(item.data.title || "");
//       setProdDescription(item.data.description || "");
//       setPriceBefore(item.data.price || "");
//       setpriceAfterDiscount(item.data.priceAfterDiscount || "");
//       setQty(item.data.quantity || "");
//       setCatID(item.data.category?._id || "0");
//       setBrandID(item.data.brand?._id || "0");
//       setColors(item.data.colors || []);

//       if (item.data.images) {
//         const imgObj = {};
//         item.data.images.forEach((img, index) => {
//           imgObj[index] = img;
//         });
//         setImages(imgObj);
//       }
//     }
//   }, [item]);

//   // 3. جلب التصنيفات الفرعية عند تغير الـ Category
//   useEffect(() => {
//     if (catID !== "0") {
//       dispatch(getSubCategoryOnCategory(catID));
//     }
//   }, [catID, dispatch]);

//   // 4. تحويل التصنيفات الفرعية لخيارات (Options)
//   useEffect(() => {
//     if (subCat && subCat.length > 0) {
//       setOptions(subCat.map((s) => ({ value: s._id, label: s.name })));
//     } else {
//       setOptions([]);
//     }
//   }, [subCat]);

//   // 5. المطابقة
//   useEffect(() => {
//     if (item?.data?.subcategories && options.length > 0) {
//       const serverIDs = item.data.subcategories.map((s) =>
//         typeof s === "string" ? s : s._id
//       );
//       const matched = options.filter((opt) => serverIDs.includes(opt.value));
//       if (JSON.stringify(matched) !== JSON.stringify(selectedSubID)) {
//         //إذا استخدمنا setSelectedSubID مباشرة بدون شرط، useEffect قد يعيد التشغيل بدون توقف.
//         setSelectedSubID(matched);
//       }
//     }
//   }, [options, item]);

//   // Handlers
//   const onSelectCategory = (e) => {
//     setCatID(e.target.value);
//     setSelectedSubID([]);
//   };

//   const handleColorChange = (selectedColor) => {
//     if (!colors.includes(selectedColor.hex))
//       setColors([...colors, selectedColor.hex]);
//     setShowColorPickerList(false);
//   };

//   const colorRemove = (colorClicked) =>
//     setColors(colors.filter((color) => color !== colorClicked));

//   const convertToFile = async (url, name) => {
//     const res = await fetch(url);
//     const blob = await res.blob();
//     return new File([blob], name, { type: blob.type });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prodName || catID === "0") return notify("أكمل البيانات", "warn");

//     const formData = new FormData();
//     formData.append("title", prodName);
//     formData.append("description", prodDescription);
//     formData.append("quantity", qty);
//     formData.append("price", priceBefore);
//     formData.append("category", catID);
//     if (brandID !== "0") formData.append("brand", brandID);
//     if (priceAfterDiscount)
//       formData.append("priceAfterDiscount", priceAfterDiscount);

//     colors.forEach((c) => formData.append("colors[]", c));
//     selectedSubID.forEach((s) => formData.append("subcategories[]", s.value)); //[ids only]
//     const imgArray = Object.values(images);
//     for (let i = 0; i < imgArray.length; i++) {
//       let file =
//         typeof imgArray[i] === "string"
//           ? await convertToFile(imgArray[i], `img${i}.png`) //convert from url to file
//           : imgArray[i]; //it is file
//       formData.append("images", file);
//       if (i === 0) formData.append("imageCover", file);
//     }

//     try {
//       await dispatch(updateProducts({ id, formData })).unwrap();
//       notify("تم التعديل علي المنتج بنجاح", "success");
//     } catch (err) {
//       notify(" خطأ في التعديل علي المنتج", "error");
//     } finally {
//       dispatch(resetStatus());
//     }
//   };

//   return {
//     prodName,
//     onNameChange: (e) => setProdName(e.target.value),
//     prodDescription,
//     onDescChange: (e) => setProdDescription(e.target.value),
//     priceBefore,
//     onPriceBeforeChange: (e) => setPriceBefore(e.target.value),
//     priceAfterDiscount,
//     onPriceAfterDiscountChange: (e) => setpriceAfterDiscount(e.target.value),
//     qty,
//     onQuantityChange: (e) => setQty(e.target.value),
//     catID,
//     onSelectCategory,
//     brandID,
//     onSelectBrand: (e) => setBrandID(e.target.value),
//     colors,
//     colorToggler: () => setShowColorPickerList(!showColorPickerList),
//     handleColorChange,
//     colorRemove,
//     showColorPickerList,
//     images,
//     setImages,
//     options,
//     selectedSubID,
//     onSelectSubCategory: (val) => setSelectedSubID(val), //for the new added
//     handleSubmit,
//     category,
//     brand,
//     loadingSub,
//     loadingProducts,
//     theme: { background: "#ffffff" },
//     crop: { unit: "%", aspect: 4 / 3, width: 80, height: 80, x: 10, y: 10 },
//   };
// };

// export default AdminEditProductHook;
/*=========second solution============*/
// import { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCategory } from "../../Features/Categories/CategorySlice";
// import { getAllBrand } from "../../Features/Brands/BrandSlice";
// import { getSubCategoryOnCategory } from "../../Features/SubCategories/SubCategorySlice";
// import {
//   getOneProduct,
//   updateProducts,
//   resetStatus,
// } from "../../Features/Products/ProductSlice";
// import notify from "./../useNotifaction";

// const AdminEditProductHook = (id) => {
//   const dispatch = useDispatch();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     priceAfterDiscount: "",
//     quantity: "",
//     category: "0",
//     brand: "0",
//     colors: [],
//     images: {},
//     subcategories: [], // ستخزن كائنات {label, value}
//   });

//   // State لتخزين الـ IDs القادمة من السيرفر بشكل مؤقت للمطابقة
//   const [selectedIDsFromServer, setSelectedIDsFromServer] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [showColorPickerList, setShowColorPickerList] = useState(false);

//   const item = useSelector((state) => state.products.oneProduct);
//   const categories = useSelector((state) => state.categories.category);
//   const brands = useSelector((state) => state.brands.brand);
//   const subCat = useSelector(
//     (state) => state.subCategories.subCategoriesByCategory
//   );
//   const loadingSub = useSelector((state) => state.subCategories.loading);
//   const loadingProducts = useSelector((state) => state.products.loading);
//   //1-fech initial data
//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(getOneProduct(id));
//       await dispatch(getAllCategory());
//       await dispatch(getAllBrand());
//     };
//     fetchData();
//   }, [dispatch, id]);

//   // 2- fill the form
//   useEffect(() => {
//     if (item?.data) {
//       const prod = item.data;
//       setForm((prev) => ({
//         ...prev,
//         title: prod.title || "",
//         description: prod.description || "",
//         price: prod.price || "",
//         priceAfterDiscount: prod.priceAfterDiscount || "",
//         quantity: prod.quantity || "",
//         category: prod.category?._id || "0",
//         brand: prod.brand?._id || "0",
//         colors: prod.colors || [],
//         images:
//           prod.images?.reduce((acc, img, index) => {
//             acc[index] = img;
//             return acc;
//           }, {}) || {},
//       }));
//       //extract ids comes from the server [id1,id2,....] we store this in state seperated
//       if (prod.subcategories) {
//         const ids = prod.subcategories.map((s) =>
//           typeof s === "string" ? s : s._id
//         );
//         setSelectedIDsFromServer(ids);
//       }
//     }
//   }, [item]);

//   // 3.fetch subcat when u changes the category
//   useEffect(() => {
//     if (form.category && form.category !== "0") {
//       dispatch(getSubCategoryOnCategory(form.category));
//     }
//   }, [form.category, dispatch]);

//   // 4. convert [] to fit the options of react-select
//   useEffect(() => {
//     if (subCat && subCat.length > 0) {//[{_id,name,category:{name}},{_id,name,category:{name}},..] to [{id1,name1},{id2,name2}]
//       const formatted = subCat.map((s) => ({ value: s._id, label: s.name }));
//       setOptions(formatted);
// //
//       if (selectedIDsFromServer.length > 0) {
//         const matched = formatted.filter((opt) =>
//           selectedIDsFromServer.includes(opt.value)
//         );
//         setForm((prev) => ({ ...prev, subcategories: matched }));
//       }
//     } else {
//       setOptions([]);
//     }
//   }, [subCat, selectedIDsFromServer]);

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const colorToggler = () => setShowColorPickerList(!showColorPickerList);

//   const handleColorChange = (selectedColor) => {
//     if (!form.colors.includes(selectedColor.hex)) {
//       setForm((prev) => ({
//         ...prev,
//         colors: [...prev.colors, selectedColor.hex],
//       }));
//     }
//     setShowColorPickerList(false);
//   };

//   const colorRemove = (colorClicked) => {
//     setForm((prev) => ({
//       ...prev,
//       colors: prev.colors.filter((c) => c !== colorClicked),
//     }));
//   };

//   const convertToFile = async (urlOrBase64, filename) => {
//     const response = await fetch(urlOrBase64);
//     const data = await response.blob();
//     return new File([data], filename, { type: data.type });
//   };

//   const convertImagesToFiles = useCallback(async (imagesObj) => {
//     const imgArray = Object.values(imagesObj);
//     return Promise.all(
//       imgArray.map(async (img, i) => {
//         if (typeof img === "string") {
//           return await convertToFile(img, `prod-${i}.png`);
//         }
//         return img;
//       })
//     );
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !form.title ||
//       form.category === "0" ||
//       Object.keys(form.images).length === 0
//     ) {
//       return notify("يرجى إكمال البيانات الأساسية", "warn");
//     }

//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("description", form.description);
//     formData.append("quantity", form.quantity);
//     formData.append("price", form.price);
//     formData.append("category", form.category);
//     if (form.brand !== "0") formData.append("brand", form.brand);
//     if (form.priceAfterDiscount)
//       formData.append("priceAfterDiscount", form.priceAfterDiscount);

//     form.colors.forEach((color) => formData.append("colors[]", color));

//     // نرسل الـ value فقط (الذي هو الـ ID)
//     form.subcategories.forEach((sub) => {
//       formData.append("subcategories[]", sub.value);//add ids only
//     });

//     try {
//       const files = await convertImagesToFiles(form.images);
//       files.forEach((file, i) => {
//         formData.append("images", file);
//         if (i === 0) formData.append("imageCover", file);
//       });

//       await dispatch(updateProducts({ id, formData })).unwrap();
//       notify("تم تحديث المنتج بنجاح", "success");
//     } catch (err) {
//       notify(err?.message || "حدث خطأ أثناء التحديث", "error");
//     } finally {
//       dispatch(resetStatus());
//     }
//   };

//   return {
//     form,
//     handleChange,
//     colorToggler,
//     handleColorChange,
//     colorRemove,
//     showColorPickerList,
//     options,
//     handleSubmit,
//     categories,
//     brands,
//     loadingSub,
//     loadingProducts,
//     images: form.images,
//     setImages: (imgs) => handleChange("images", imgs),
//     colors: form.colors,
//     theme: { background: "#ffffff" },
//     crop: { unit: "%", aspect: 4 / 3, width: 80, height: 80, x: 10, y: 10 },
//   };
// };

// export default AdminEditProductHook;
/*===========third solution===========*/
import { useState, useEffect } from "react"; //, useCallback
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProductSchema } from "../../Validation/productSchema";
import {
  getOneProduct,
  updateProducts,
} from "../../Features/Products/ProductSlice";
import { getAllCategory } from "../../Features/Categories/CategorySlice";
import { getAllBrand } from "../../Features/Brands/BrandSlice";
import { getSubCategoryOnCategory } from "../../Features/SubCategories/SubCategorySlice";
import notify from "./../useNotifaction";

const AdminEditProductHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [showColor, setShowColor] = useState(false);
  const [options, setOptions] = useState([]);

  // Redux Selectors
  const item = useSelector((state) => state.products.oneProduct);
  const category = useSelector((state) => state.categories.category);
  const brand = useSelector((state) => state.brands.brand);
  const subCat = useSelector(
    (state) => state.subCategories.subCategoriesByCategory
  );
  const loadingSub = useSelector((state) => state.subCategories.loading);
  const loading = useSelector((state) => state.products.loading);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProductSchema),
    mode: "onChange",
    defaultValues: { catID: "0", brandID: "0", selectedSubID: [] },
  });

  const selectedCat = watch("catID");

  // 1. جلب البيانات الأولية
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
    dispatch(getOneProduct(id));
  }, [id, dispatch]);

  // 2. تعبئة النموذج عند وصول بيانات المنتج
  useEffect(() => {
    if (item?.data) {
      const prod = item.data;
      reset({
        prodName: prod.title || "",
        prodDescription: prod.description || "",
        priceBefore: prod.price || "",
        priceAfterDiscount: prod.priceAfterDiscount || "",
        qty: prod.quantity || "",
        catID: prod.category?._id || prod.category || "",
        brandID: prod.brand?._id || prod.brand || "",
      });
      setColors(prod.colors || []);
      // تحويل مصفوفة الصور القادمة من السيرفر إلى Object لـ MultiImageInput
      if (prod.images) {
        const imgObj = {};
        prod.images.forEach((img, idx) => (imgObj[idx] = img));
        setImages(imgObj);
      }
      if (prod.category) {
        dispatch(getSubCategoryOnCategory(prod.category._id || prod.category));
      }
    }
  }, [item, reset, dispatch]);

  // 3. جلب التصنيفات الفرعية عند تغيير التصنيف الرئيسي يدوياً
  useEffect(() => {
    if (selectedCat && selectedCat !== "0" && selectedCat !== "") {
      dispatch(getSubCategoryOnCategory(selectedCat));
    }
  }, [selectedCat, dispatch]);

  // 4. تحديث خيارات الـ Select ومزامنة المختار منها
  useEffect(() => {
    if (!subCat?.length) return;

    const formattedOptions = subCat.map((s) => ({
      value: s._id,
      label: s.name,
    }));

    setOptions(formattedOptions);

    if (item?.data?.subcategories) {
      const serverSubIDs = item.data.subcategories.map((s) =>
        typeof s === "string" ? s : s._id
      );

      const selected = formattedOptions.filter((opt) =>
        serverSubIDs.includes(opt.value)
      );

      setValue("selectedSubID", selected, { shouldValidate: false });
    }
  }, [subCat, item, setValue]);

  // دالة تحويل الصور Base64 إلى ملفات (Files)
  const convertToFile = async (urlOrBase64, filename) => {
    try {
      const response = await fetch(urlOrBase64);
      const data = await response.blob();
      return new File([data], filename, { type: data.type });
    } catch {
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!Object.keys(images).length) {
      notify("من فضلك أضف صورة واحدة على الأقل", "error");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.prodName);
    formData.append("description", data.prodDescription);
    formData.append("quantity", data.qty);
    formData.append("price", data.priceBefore);
    if (data.priceAfterDiscount)
      formData.append("priceAfterDiscount", data.priceAfterDiscount);
    formData.append("category", data.catID);
    if (data.brandID && data.brandID !== "0")
      formData.append("brand", data.brandID);

    colors.forEach((c) => formData.append("colors", c));
    data.selectedSubID.forEach((s) =>
      formData.append("subcategories", s.value)
    );
    // معالجة الصور (الجديدة والقديمة)
    const imageValues = Object.values(images);
    for (let i = 0; i < imageValues.length; i++) {
      const img = imageValues[i];
      let fileToAppend;

      if (typeof img === "string" && img.startsWith("http")) {
        // إذا كان رابطاً قديماً، نقوم بتحويله لملف إذا كان السيرفر يتوقع ملفات دائماً
        fileToAppend = await convertToFile(img, `old-prod-${i}.png`);
      } else if (typeof img === "string" && img.startsWith("data:image")) {
        // إذا كان Base64 جديداً
        fileToAppend = await convertToFile(img, `new-prod-${i}.png`);
      } else {
        fileToAppend = img; // ملف جاهز
      }

      if (fileToAppend) {
        formData.append("images", fileToAppend);
        if (i === 0) formData.append("imageCover", fileToAppend);
      }
    }

    try {
      await dispatch(updateProducts({ id, formData })).unwrap();
      notify("تم تحديث المنتج بنجاح", "success");
      setTimeout(() => navigate("/admin/allproducts"), 1500);
    } catch (err) {
      notify(err?.message || "فشل في عملية التحديث", "error");
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    control,
    images,
    setImages,
    category,
    brand,
    options,
    loading,
    loadingSub,
    showColor,
    colorToggler: () => setShowColor(!showColor),
    colors,
    colorRemove: (c) => setColors((prev) => prev.filter((col) => col !== c)),
    handleColorChange: (color) => {
      if (!colors.includes(color.hex)) setColors([...colors, color.hex]);
      setShowColor(false);
    },
    item,
  };
};

export default AdminEditProductHook;
