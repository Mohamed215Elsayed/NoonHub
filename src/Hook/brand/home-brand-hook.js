import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../../Features/Brands/BrandSlice";

const HomeBrandHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrand(6));
  }, [dispatch]);
  const brand = useSelector((state) => state.brands.brand);
  const loading = useSelector((state) => state.brands.loading);
  return [brand, loading];
};
export default HomeBrandHook;
