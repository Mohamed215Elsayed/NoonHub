import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Features/Categories/CategorySlice";
import { getAllBrand } from "../../Features/Brands/BrandSlice";
import ViewSearchProductsHook from "../product/view-search-products-hook";

const SidebarSearchHook = () => {
  const { getProduct } = ViewSearchProductsHook();
  const dispatch = useDispatch();

  const [catChecked, setCatChecked] = useState(
    JSON.parse(localStorage.getItem("catChecked") || "[]")
  );
  const [brandChecked, setBrandChecked] = useState(
    JSON.parse(localStorage.getItem("brandChecked") || "[]")
  );
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  const category =
    useSelector((state) => state.categories.category?.data) || [];
  const brand = useSelector((state) => state.brands.brand?.data) || [];

  /* ================= Logic Logic ================= */
  const clickCategory = (e) => {
    const value = e.target.value;
    let updatedChecked = [];

    if (value === "0") {
      updatedChecked = [];
    } else {
      // نتحقق من الحالة الحالية للمصفوفة
      if (e.target.checked) {
        updatedChecked = [...catChecked, value];
      } else {
        updatedChecked = catChecked.filter((id) => id !== value);
      }
    }

    // تحديث الحالة فوراً
    setCatChecked(updatedChecked);
    // حفظ في localStorage كـ JSON
    localStorage.setItem("catChecked", JSON.stringify(updatedChecked));

    // استدعاء جلب المنتجات (تأكد أن getProduct تعتمد على localStorage)
    setTimeout(() => {
      getProduct();
    }, 10);
  };

  const clickBrand = (e) => {
    const value = e.target.value;
    let newBrand = [];
    if (value === "0") {
      newBrand = [];
    } else {
      newBrand = e.target.checked
        ? [...brandChecked, value]
        : brandChecked.filter((id) => id !== value);
    }
    setBrandChecked(newBrand);
    localStorage.setItem("brandChecked", JSON.stringify(newBrand));
    setTimeout(() => getProduct(), 0);
  };

  //   useEffect(() => {
  //     const query = catChecked.map((id) => `category[in][]=${id}`).join("&");

  //     localStorage.setItem("catChecked", query);
  //     getProduct(1);
  //   }, [catChecked, getProduct]);
  useEffect(() => {
    localStorage.setItem("catChecked", JSON.stringify(catChecked));
    getProduct(1);
  }, [catChecked, getProduct]);

  //   useEffect(() => {
  //     const query = brandChecked.map((id) => `brand[in][]=${id}`).join("&");

  //     localStorage.setItem("brandChecked", query);
  //     getProduct(1);
  //   }, [brandChecked, getProduct]);
  useEffect(() => {
    localStorage.setItem("brandChecked", JSON.stringify(brandChecked));
    getProduct(1);
  }, [brandChecked, getProduct]);
  // أسعار
  const [priceFrom, setPriceFrom] = useState(
    localStorage.getItem("priceFrom") || ""
  );
  const [priceTo, setPriceTo] = useState(localStorage.getItem("priceTo") || "");

  const onChangePriceFrom = (e) => {
    localStorage.setItem("priceFrom", e.target.value);
    setPriceFrom(e.target.value);
  };

  const onChangePriceTo = (e) => {
    localStorage.setItem("priceTo", e.target.value);
    setPriceTo(e.target.value);
  };

  // لتنفيذ البحث عند تغيير السعر (يفضل إضافة debounce هنا أيضاً)
  useEffect(() => {
    getProduct();
  }, [priceFrom, priceTo, getProduct]);

  return {
    category,
    brand,
    catChecked,
    brandChecked,
    clickCategory,
    clickBrand,
    priceFrom,
    priceTo,
    onChangePriceFrom,
    onChangePriceTo,
  };
};
export default SidebarSearchHook;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { getAllCategory } from "../../Features/Categories/CategorySlice";
// import { getAllBrand } from "../../Features/Brands/BrandSlice";

// const SidebarSearchHook = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();

//   /* ================= Fetch Filters ================= */
//   useEffect(() => {
//     dispatch(getAllCategory());
//     dispatch(getAllBrand());
//   }, [dispatch]);

//   const category =
//     useSelector((state) => state.categories.category?.data) || [];
//   const brand =
//     useSelector((state) => state.brands.brand?.data) || [];

//   /* ================= Helpers ================= */
//   const toggleMultiValue = (key, value) => {
//     setSearchParams((prev) => {
//       const next = new URLSearchParams(prev);
//       const values = next.getAll(key);

//       next.delete(key);

//       if (values.includes(value)) {
//         values
//           .filter((v) => v !== value)
//           .forEach((v) => next.append(key, v));
//       } else {
//         values.forEach((v) => next.append(key, v));
//         next.append(key, value);
//       }

//       next.set("page", 1); // reset pagination
//       return next;
//     });
//   };

//   /* ================= Category ================= */
//   const clickCategory = (e) => {
//     const value = e.target.value;
//     toggleMultiValue("category[in][]", value);
//   };

//   /* ================= Brand ================= */
//   const clickBrand = (e) => {
//     const value = e.target.value;
//     toggleMultiValue("brand[in][]", value);
//   };

//   /* ================= Price ================= */
//   const onChangePriceFrom = (e) => {
//     const value = e.target.value;
//     setSearchParams((prev) => {
//       const next = new URLSearchParams(prev);
//       value ? next.set("price[gt]", value) : next.delete("price[gt]");
//       next.set("page", 1);
//       return next;
//     });
//   };

//   const onChangePriceTo = (e) => {
//     const value = e.target.value;
//     setSearchParams((prev) => {
//       const next = new URLSearchParams(prev);
//       value ? next.set("price[lte]", value) : next.delete("price[lte]");
//       next.set("page", 1);
//       return next;
//     });
//   };

//   return {
//     category,
//     brand,
//     catChecked: searchParams.getAll("category[in][]"),
//     brandChecked: searchParams.getAll("brand[in][]"),
//     priceFrom: searchParams.get("price[gt]") || "",
//     priceTo: searchParams.get("price[lte]") || "",
//     clickCategory,
//     clickBrand,
//     onChangePriceFrom,
//     onChangePriceTo,
//   };
// };

// export default SidebarSearchHook;
