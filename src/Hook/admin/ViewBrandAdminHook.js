import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand, getAllBrandPage } from '../../Features/Brands/BrandSlice';

const ViewBrandAdminHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrand(8));
  }, [dispatch]);

  const allBrands = useSelector((state) => state.brands.brand);
  const loading = useSelector((state) => state.brands.loading);

  let items = [];
  let pageCount = 0;

  if (allBrands && allBrands.data) {
    items = allBrands.data;
  }

  if (allBrands?.pagination?.numberOfPages) {
    pageCount = allBrands.pagination.numberOfPages;
  }

  const currentPage = allBrands?.pagination?.currentPage || 1;

  const getPage = (page) => {
    dispatch(getAllBrandPage(page));
  };

  return { items, currentPage, pageCount, getPage, loading };
};

export default ViewBrandAdminHook;
