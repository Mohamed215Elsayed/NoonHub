import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ViewSearchProductsHook from "../product/view-search-products-hook";
const NavbarSearchHook = () => {
  const { getProduct } = ViewSearchProductsHook();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchWord, setSearchWord] = useState(
    localStorage.getItem("searchWord") || ""
  );

  const OnChangeSearch = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchWord(value);

      if (location.pathname !== "/products") {
        navigate("/products");
      }
    },
    [navigate, location.pathname]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("searchWord", searchWord);

      if (location.pathname === "/products") {
        getProduct();
      }
    }, 600);

    return () => clearTimeout(handler); //cleanup fn
  }, [searchWord, location.pathname, getProduct]);

  return { searchWord, OnChangeSearch };
};
export default NavbarSearchHook;

/******************* */
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

// const NavbarSearchHook = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [searchWord, setSearchWord] = useState(
//     searchParams.get("keyword") || ""
//   );

//   const keyword = searchParams.get("keyword") || "";
//   useEffect(() => {
//     //   setSearchWord(searchParams.get("keyword") || "");
//     // }, [searchParams]);
//     setSearchWord(keyword);
//   }, [keyword]);
//   /* ================= Handle input ================= */
//   const OnChangeSearch = useCallback(
//     (e) => {
//       const value = e.target.value;

//       if (location.pathname !== "/products") {
//         navigate("/products", { replace: true }); //لو حابب تمنع navigation المتكرر://✔️ يمنع تراكم history entries
//       }

//       setSearchParams((prev) => {
//         const next = new URLSearchParams(prev);

//         if (value) {
//           next.set("keyword", value);
//         } else {
//           next.delete("keyword");
//         }

//         next.set("page", 1); // reset pagination
//         return next;
//       });
//     },
//     [navigate, location.pathname, setSearchParams]
//   );

//   return { searchWord, OnChangeSearch };
// };

// export default NavbarSearchHook;
