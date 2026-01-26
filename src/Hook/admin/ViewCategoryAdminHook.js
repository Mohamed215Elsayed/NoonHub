import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCategory,
  getAllCategoryPage,
} from '../../Features/Categories/CategorySlice';

const ViewCategoryAdminHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory(8));
  }, [dispatch]);

  const allCategories = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);

  let items = [];
  let pageCount = 0;
  if (allCategories && allCategories.data) {
    items = allCategories.data;
  }

  if (allCategories?.pagination?.numberOfPages) {
    pageCount = allCategories.pagination.numberOfPages;
  }

  const currentPage = allCategories?.pagination?.currentPage || 1;

  const getPage = (page) => {
    dispatch(getAllCategoryPage(page));
  };

  return { items, currentPage, pageCount, getPage, loading };
};

export default ViewCategoryAdminHook;
