import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsPage,
} from "../../Features/Products/ProductSlice";
const ViewProductAdminHook = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(8));
  }, [dispatch]);

  const allProducts = useSelector((state) => state.products.allProducts);
  const loading = useSelector((state) => state.products.loading);

  let items = [];
  let pageCount = 0;
  if (allProducts && allProducts.data) {
    items = allProducts.data;
  }

  if (allProducts?.pagination?.numberOfPages) {
    pageCount = allProducts.pagination.numberOfPages;
  }
  
  const currentPage = allProducts?.pagination?.currentPage || 1;
    const getPage = (page) => {
        dispatch(getAllProductsPage({ page, limit: 8 }));
    };
  return { items, currentPage, pageCount,getPage, loading };
};

export default ViewProductAdminHook;
