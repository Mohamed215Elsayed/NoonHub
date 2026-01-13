import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSearch } from "../../Features/Products/ProductSlice";
const SORT_MAP = {
  "": "",
  price: "price",
  "-price": "-price",
  "-sold": "-sold",
  "-ratingsAverage": "-ratingsAverage",
};
const getSortQuery = () => {
  const sortType = localStorage.getItem("sortType") || "";
  return SORT_MAP[sortType] ?? "";
};

const ViewSearchProductsHook = () => {
  const limit = 8;
  const dispatch = useDispatch();

  // دالة موحدة لجلب البيانات من التخزين المحلي
  const getValuesFromStorage = () => {
    const word = localStorage.getItem("searchWord") || "";
    const catChecked = JSON.parse(localStorage.getItem("catChecked") || "[]");
    const brandChecked = JSON.parse(
      localStorage.getItem("brandChecked") || "[]"
    );
    const priceFrom = localStorage.getItem("priceFrom") || "";
    const priceTo = localStorage.getItem("priceTo") || "";

    // بناء query array
    const params = [
      `keyword=${encodeURIComponent(word)}`,
      ...catChecked.map((id) => `category[in][]=${encodeURIComponent(id)}`),
      ...brandChecked.map((id) => `brand[in][]=${encodeURIComponent(id)}`),
      priceFrom && +priceFrom > 0
        ? `price[gt]=${encodeURIComponent(priceFrom)}`
        : "",
      priceTo && +priceTo > 0
        ? `price[lte]=${encodeURIComponent(priceTo)}`
        : "",
    ].filter((p) => p !== "");

    return params;
  };

  const getProduct = useCallback(() => {
    const sort = getSortQuery();
    const params = getValuesFromStorage();
    const queryString = [`sort=${sort}`, `limit=${limit}`, ...params].join("&");

    dispatch(getAllProductsSearch(queryString));
  }, [dispatch, limit]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);
  const getPage = useCallback(
    (page) => {
      const sort = getSortQuery();
      const params = getValuesFromStorage();
      const queryString = [
        `page=${page}`,
        `sort=${sort}`,
        `limit=${limit}`,
        ...params,
      ].join("&");

      dispatch(getAllProductsSearch(queryString));
    },
    [dispatch, limit]
  );

  const allProducts = useSelector((state) => state.products.allProducts);
  const items = allProducts?.data || [];
  const currentPage = allProducts?.pagination?.currentPage || 1;
  const pageCount = allProducts?.pagination?.numberOfPages || 0;
  const resultsCount = allProducts?.results || 0;

  return { items, pageCount, currentPage, getPage, resultsCount, getProduct };
};
export default ViewSearchProductsHook;
// import { useEffect, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { getAllProductsSearch } from "../../Features/Products/ProductSlice";

// const DEFAULT_LIMIT = 8;

// const ViewSearchProductsHook = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();

//   /* =========================
//      Build Query From URL
//   ========================= */
//   const queryString = useMemo(() => {
//     const params = [];

//     // keyword
//     const keyword = searchParams.get("keyword");
//     if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);

//     // category
//     searchParams.getAll("category[in][]").forEach((id) => {
//       params.push(`category[in][]=${encodeURIComponent(id)}`);
//     });

//     // brand
//     searchParams.getAll("brand[in][]").forEach((id) => {
//       params.push(`brand[in][]=${encodeURIComponent(id)}`);
//     });

//     // price
//     const priceFrom = searchParams.get("price[gt]");
//     // if (priceFrom) params.push(`price[gt]=${priceFrom}`);
//     if (priceFrom) params.push(`price[gt]=${encodeURIComponent(priceFrom)}`);

//     const priceTo = searchParams.get("price[lte]");
//     // if (priceTo) params.push(`price[lte]=${priceTo}`);
//     if (priceTo) params.push(`price[lte]=${encodeURIComponent(priceTo)}`);

//     // sort
//     const sort = searchParams.get("sort");
//     if (sort) params.push(`sort=${sort}`);

//     // page
//     const page = searchParams.get("page") || 1;
//     params.push(`page=${page}`);

//     // limit (ثابت)
//     params.push(`limit=${DEFAULT_LIMIT}`);

//     return params.join("&");
//   }, [searchParams]);

//   /* =========================
//      Fetch Products
//   ========================= */
//   useEffect(() => {
//     dispatch(getAllProductsSearch(queryString));
//   }, [dispatch, queryString]);

//   /* =========================
//      Pagination
//   ========================= */
//   const getPage = useCallback(
//     (page) => {
//       setSearchParams((prev) => {
//         const next = new URLSearchParams(prev);
//         next.set("page", page);
//         return next;
//       });
//     },
//     [setSearchParams]
//   );

//   /* =========================
//      Data
//   ========================= */
//   const allProducts = useSelector((state) => state.products.allProducts);

//   return {
//     items: allProducts?.data || [],
//     currentPage: allProducts?.pagination?.currentPage || 1,
//     pageCount: allProducts?.pagination?.numberOfPages || 0,
//     resultsCount: allProducts?.results || 0,
//     getPage,
//   };
// };

// export default ViewSearchProductsHook;
