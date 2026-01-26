import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsByBrand } from '../../Features/Products/ProductSlice';

const ViewAllProductsBrandHook = (brandArgId) => {
  const limit = 8;
  const dispatch = useDispatch();

  const getProduct = useCallback(
    async (page = 1) => {
      if (brandArgId) {
        await dispatch(
          getAllProductsByBrand({
            page,
            limit,
            brandID: brandArgId,
          })
        );
      }
    },
    [dispatch, brandArgId, limit]
  );

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const getPage = (page) => {
    getProduct(page);
  };

  const allProductBrand = useSelector(
    (state) => state.products.allProductBrand
  );
  const loading = useSelector((state) => state.products.loadingBrand);

  const items = allProductBrand?.data || [];
  const currentPage = allProductBrand?.pagination?.currentPage || 1;
  const pageCount = allProductBrand?.pagination?.numberOfPages || 0;

  return { items, pageCount, getPage, currentPage, loading };
};

export default ViewAllProductsBrandHook;
