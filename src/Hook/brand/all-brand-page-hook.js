import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllBrand, getAllBrandPage } from "../../Features/Brands/BrandSlice";
const AllBrandHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand(6));
  }, [dispatch]);

  const { brand, loading } = useSelector(
    (state) => state.brands,
    shallowEqual
  );

  const pageCount = brand?.pagination?.numberOfPages || 0;
  const currentPage = brand?.pagination?.currentPage || 1;

  const getPage = (page) => {
    dispatch(getAllBrandPage(page));
  };
  return [brand, loading, pageCount, currentPage, getPage];
};
export default AllBrandHook;
