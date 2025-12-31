import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsPage,
} from "../../Features/Products/ProductSlice";

const ViewSearchProductsHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(12));
  }, [dispatch]);

  const allProducts = useSelector((state) => state.products.allProducts);

  let items = [];
  if (allProducts && allProducts.data) {
    items = allProducts.data;
  }

  const currentPage = allProducts?.pagination?.currentPage || 1;

  let pageCount = 0;
  if (allProducts?.pagination?.numberOfPages) {
    pageCount = allProducts.pagination.numberOfPages;
  }

  const getPage = (page) => {
    dispatch(getAllProductsPage({ page: page, limit: 12 }));
  };

  const resultsCount = allProducts?.results || 0;
  return [items, pageCount, currentPage, getPage, resultsCount];
};

export default ViewSearchProductsHook;
