import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsByCategory } from '../../Features/Products/ProductSlice';

const ViewAllProductsCategoryHook = (CatArgId) => {
  const limit = 8;
  const dispatch = useDispatch();

  const getProduct = useCallback(
    async (page = 1) => {
      if (CatArgId) {
        await dispatch(
          getAllProductsByCategory({
            page,
            limit,
            CatId: CatArgId,
          })
        );
      }
    },
    [dispatch, CatArgId, limit]
  );

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const getPage = (page) => {
    getProduct(page);
  };

  const allProductCat = useSelector((state) => state.products.allProductCat);
  const loading = useSelector((state) => state.products.loadingCategory);

  const items = allProductCat?.data || [];
  const currentPage = allProductCat?.pagination?.currentPage || 1;
  const pageCount = allProductCat?.pagination?.numberOfPages || 0;

  return { items, pageCount, getPage, currentPage, loading };
};

export default ViewAllProductsCategoryHook;
