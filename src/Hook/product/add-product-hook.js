// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllCategory } from "../../Features/Categories/CategorySlice";
// import { getAllBrand } from "../../Features/Brands/BrandSlice";
// import { getSubCategoryOnCategory } from "../../Features/SubCategories/SubCategorySlice";
// import {
//   createProduct,
//   resetStatus,
// } from "../../Features/Products/ProductSlice";
// import notify from "./../useNotifaction";
// /*==========================================*/
// const AdminAddProductsHook = () => {
//   /*======start settings for react-multiple images input====*/
//   const theme = {
//     background: "#ffffff",
//     outlineColor: "#e5e7eb",
//     textColor: "#374151",
//     buttonColor: "#ff0e1f",
//     modalColor: "#ffffff",
//   };
//   const crop = {
//     unit: "%", //'px', // default, can be 'px' or '%'
//     aspect: 4 / 3,
//     width: 80,
//     height: 80,
//     x: 10,
//     y: 10,
//   };

//   const handleError = (error) => {
//     console.log(error);
//   };
//   /*==============listen to store=======================*/
//   const dispatch = useDispatch();
//   /*===============Selectors======================*/
//   const category = useSelector((state) => state.categories.category);
//   const brand = useSelector((state) => state.brands.brand);
//   const subCat = useSelector(
//     (state) => state.subCategories.subCategoriesByCategory
//   );
//   const loadingSub = useSelector((state) => state.subCategories.loading);
//   const loadingProducts = useSelector((state) => state.products.loading);
//   /*==========Fetch initial data============*/
//   useEffect(() => {
//     dispatch(getAllCategory());
//     dispatch(getAllBrand());
//   }, [dispatch]);
//   /*============start form states============*/
//   const [images, setImages] = useState({});
//   const [prodName, setProdName] = useState("");
//   const [prodDescription, setProdDescription] = useState("");
//   const [priceBefore, setPriceBefore] = useState("");
//   const [priceAfterDiscount, setpriceAfterDiscount] = useState("");
//   const [qty, setQty] = useState("");
//   const [catID, setCatID] = useState("0");
//   const [brandID, setBrandID] = useState("0");
//   const [showColorPickerList, setShowColorPickerList] = useState(false);
//   const [colors, setColors] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [selectedSubID, setSelectedSubID] = useState([]);
//   /*==========update Form State==============*/
//   const onNameChange = (e) => setProdName(e.target.value);
//   const onDescChange = (e) => setProdDescription(e.target.value);
//   const onPriceBeforeChange = (e) => setPriceBefore(e.target.value);
//   const onPriceAfterDiscountChange = (e) =>
//     setpriceAfterDiscount(e.target.value);
//   const onQuantityChange = (e) => setQty(e.target.value);
//   const colorToggler = () => setShowColorPickerList(!showColorPickerList);
//   const handleColorChange = (selectedColor) => {
//     if (!colors.includes(selectedColor.hex))
//       setColors([...colors, selectedColor.hex]);
//     setShowColorPickerList(false);
//   };
//   const colorRemove = (colorClicked) => {
//     let colorNotClicked = colors.filter((c) => c !== colorClicked);
//     setColors(colorNotClicked);
//   };
//   const onSelectCategory = async (e) => {
//     const categoryId = e.target.value;
//     setCatID(categoryId);
//     setSelectedSubID([]);
//     if (categoryId !== "0") {
//       dispatch(getSubCategoryOnCategory(categoryId));
//     } else {
//       setOptions([]);
//     }
//   };
//   const onSelectBrand = async (e) => setBrandID(e.target.value);
//   //once u seletc category we fetch all subCategories belongs to it and handle them with fit in react multislect
//   useEffect(() => {
//     //const options = [{ label: "هواتف ذكية", value: 1 },];
//     if (subCat && subCat.length > 0) {
//       const formatted = subCat.map((item) => ({
//         value: item._id,
//         label: item.name,
//       }));
//       setOptions(formatted);
//     } else {
//       setOptions([]);
//     }
//   }, [subCat]);
//   const onSelectSubCategory = (selectedOptions) => {
//     setSelectedSubID(selectedOptions || []);
//   };
//   /*==fn to convert (default for image by MultiImageInput base64) to file(for server)==*/
//   const dataURLtoFile = (dataurl, filename = "image") => {
//     //base64(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...)
//     const arr = dataurl.split(","); //arr[0] = "data:image/png;base64" arr[1] = "iVBORw0KGgoAAAANSUhEUgAA..."
//     if (arr.length < 2) return null; //نوقف الدالة ونرجّع null ده يمنع errors في runtime
//     const mime = arr[0].match(/:(.*?);/)[1]; //image/png
//     const ext = mime.split("/")[1]; //ex === png
//     const bstr = atob(arr[1]); //atob = decode Base64 (to binary string)
//     let n = bstr.length; //it is length
//     const u8arr = new Uint8Array(n); //Array مخصص لتخزين بيانات binary  ,كل عنصر = 1 byte
//     while (n--) u8arr[n] = bstr.charCodeAt(n); //charCodeAt تعطي UTF-16 code unit، not UTF-8.
//     //لو عايز Byte Array حقيقي من UTF-8، ممكن تستخدم TextEncoder بدلها.
//     //   for (let i = 0; i < n; i++) {
//     // u8arr[i] = bstr.charCodeAt(i);
//     // }
//     return new File([u8arr], `${filename}.${ext}`, { type: mime });
//   };

//   /*==========================================*/
//   /*===============to submit the form===========*/
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (catID === "0") {
//       return notify("من فضلك اختر تصنيف رئيسي", "warn");
//     }
//     if (!prodName.trim()) {
//       return notify("اسم المنتج مطلوب", "warn");
//     }
//     if (Number(priceBefore) <= 0) {
//       return notify("السعر يجب أن يكون رقمًا موجبًا", "warn");
//     }
//     if (
//       Number(priceAfterDiscount) <= 0 &&
//       Number(priceAfterDiscount) >= Number(priceBefore)
//     ) {
//       return notify("سعر الخصم يجب أن يكون أقل من السعر الأصلي", "warn");
//     }

//     if (Number(qty) <= 0) {
//       return notify("الكمية يجب أن تكون رقمًا موجبًا", "warn");
//     }

//     if (Object.keys(images).length === 0) {
//       return notify("من فضلك أضف صورة واحدة على الأقل", "warn");
//     }
//     try {
//       const formData = new FormData();
//       formData.append("title", prodName); //((firstfield is "dbfield"),secondField is state_var)
//       formData.append("description", prodDescription);
//       formData.append("quantity", qty);
//       formData.append("price", priceBefore);
//       if (priceAfterDiscount) {
//         formData.append("priceAfterDiscount", priceAfterDiscount);
//       }
//       formData.append("category", catID);
//       if (brandID !== "0") formData.append("brand", brandID);
//       colors.forEach((color) => formData.append("colors[]", color)); //we add []

//       selectedSubID.forEach(
//         (sub) => formData.append("subcategories[]", sub.value) //sub is [{label:name,value:id}]
//       ); //we add []
//       // console.log(selectedSubID);
//       const imgArray = Object.values(images);
//       if (imgArray[0]) {
//         formData.append(
//           "imageCover",
//           dataURLtoFile(imgArray[0], `ProductCover-${Math.random()}.png`)
//         );
//       }

//       imgArray.forEach((img) => {
//         formData.append(
//           "images",
//           dataURLtoFile(img, `prod-${Math.random()}.png`)
//         );
//       });
//       await dispatch(createProduct(formData)).unwrap();
//       notify("تمت الإضافة بنجاح", "success");

//       // reset form
//       setProdName("");
//       setProdDescription("");
//       setPriceBefore("");
//       setpriceAfterDiscount("");
//       setQty("");
//       setColors([]);
//       setImages({});
//       setSelectedSubID([]);
//       setCatID("0");
//       setBrandID("0");
//     } catch (err) {
//       notify(err?.message || "حدث خطأ أثناء الإضافة", "error");
//     } finally {
//       dispatch(resetStatus());
//     }
//   };
//   /*============export states and fns ===========*/
//   return {
//     theme,
//     crop,
//     handleError,
//     images,
//     setImages,
//     prodName,
//     onNameChange,
//     prodDescription,
//     onDescChange,
//     priceBefore,
//     onPriceBeforeChange,
//     priceAfterDiscount,
//     onPriceAfterDiscountChange,
//     qty,
//     onQuantityChange,
//     category,
//     onSelectCategory,
//     brand,
//     onSelectBrand,
//     showColorPickerList,
//     colorToggler,
//     colors,
//     handleColorChange,
//     colorRemove,
//     options,
//     selectedSubID,
//     onSelectSubCategory,
//     handleSubmit,
//     loadingSub,
//     loadingProducts,
//   };
//   /*==========================================*/
// };
// export default AdminAddProductsHook;
// /*==========================================*/
// /*==============Second Way RHF and Zod============================*/

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "../../Validation/productSchema";
import { getAllCategory } from "../../Features/Categories/CategorySlice";
import { getAllBrand } from "../../Features/Brands/BrandSlice";
import { getSubCategoryOnCategory } from "../../Features/SubCategories/SubCategorySlice";
import {
  createProduct,
  resetStatus,
} from "../../Features/Products/ProductSlice";
import notify from "./../useNotifaction";

const AdminAddProductsHook = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState({});
  const [showColor, setShowColor] = useState(false);
  const [options, setOptions] = useState([]);

  // RHF Setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: { catID: "0", brandID: "0", colors: [], selectedSubID: [] },
    mode: "onChange", // هذا سيجعل الرسائل تظهر بمجرد خروج المستخدم من الحقل أو الكتابة
  });

  const selectedColors = watch("colors") || [];
  const selectedCat = watch("catID");

  // Redux Selectors
  const category = useSelector((state) => state.categories.category);
  const brand = useSelector((state) => state.brands.brand);
  const subCat = useSelector(
    (state) => state.subCategories.subCategoriesByCategory
  );
  const loading = useSelector((state) => state.products.loading);
  const loadingSub = useSelector((state) => state.subCategories.loading);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  // Fetch subcategories when category changes
  // useEffect(() => {
  //   if (selectedCat && selectedCat !== "0") {
  //     dispatch(getSubCategoryOnCategory(selectedCat));
  //   } else {
  //     setOptions([]);
  //   }
  //   setValue("selectedSubID", []);
  // }, [selectedCat, dispatch, setValue]);
  useEffect(() => {
    if (!selectedCat || selectedCat === "0") {
      setOptions([]);
      setValue("selectedSubID", []);
      return;
    }

    dispatch(getSubCategoryOnCategory(selectedCat));
    setValue("selectedSubID", []);
  }, [selectedCat, dispatch, setValue]);

  useEffect(() => {
    if (subCat?.length > 0) {
      setOptions(subCat.map((item) => ({ value: item._id, label: item.name })));
    }
  }, [subCat]);

  const colorToggler = () => setShowColor(!showColor);
  const handleColorChange = (color) => {
    if (!selectedColors.includes(color.hex)) {
      setValue("colors", [...selectedColors, color.hex], {
        shouldValidate: true,
      });
    }
    setShowColor(false);
  };

  const colorRemove = (color) => {
    setValue(
      "colors",
      selectedColors.filter((c) => c !== color)
    );
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const onSubmit = async (data) => {
    if (Object.keys(images).length === 0)
      return notify("أضف صورة واحدة على الأقل", "warn");

    const formData = new FormData();
    formData.append("title", data.prodName);
    formData.append("description", data.prodDescription);
    formData.append("quantity", data.qty);
    formData.append("price", data.priceBefore);
    if (data.priceAfterDiscount)
      formData.append("priceAfterDiscount", data.priceAfterDiscount);
    formData.append("category", data.catID);
    if (data.brandID !== "0") formData.append("brand", data.brandID);

    // const imgArray = Object.values(images);
    // formData.append(
    //   "imageCover",
    //   dataURLtoFile(imgArray[0], `cover-${Date.now()}.png`)
    // );
    // imgArray.forEach((img) =>
    //   formData.append("images", dataURLtoFile(img, `prod-${Date.now()}.png`))
    // );
    const imgArray = Object.values(images);
    formData.append(
      "imageCover",
      dataURLtoFile(imgArray[0], `cover-${Date.now()}.png`)
    );

    imgArray
      .slice(1)
      .forEach((img) =>
        formData.append("images", dataURLtoFile(img, `prod-${Date.now()}.png`))
      );

    data.colors.forEach((c) => formData.append("colors", c));
    data.selectedSubID.forEach((s) =>
      formData.append("subcategories", s.value)
    );

    try {
      await dispatch(createProduct(formData)).unwrap();
      notify("تمت الإضافة بنجاح", "success");
      // reset();
      reset({
        catID: "0",
        brandID: "0",
        colors: [],
        selectedSubID: [],
      });
      setImages({});
      setShowColor(false);
      setOptions([]);
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((error) => notify(error.msg, "error"));
      } else {
        notify(err.message || "حدث خطأ أثناء الإضافة", "error");
      }
    } finally {
      dispatch(resetStatus());
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
    colorToggler,
    colors: selectedColors,
    colorRemove,
    handleColorChange,
  };
};

export default AdminAddProductsHook;
