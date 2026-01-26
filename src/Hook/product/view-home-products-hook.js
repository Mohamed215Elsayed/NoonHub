import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Features/Products/ProductSlice';
const ViewHomeProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts(4));
  }, [dispatch]);
  const allProducts = useSelector((state) => state.products.allProducts);
  const loading = useSelector((state) => state.products.loadingAllProducts);
  let items = [];

  if (allProducts && allProducts.data) {
    items = allProducts.data.slice(0, 4);
  } else {
    items = [];
  }

  return [items, loading];
};

export default ViewHomeProductsHook;
