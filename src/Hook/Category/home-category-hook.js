import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Features/Categories/CategorySlice";
const HomeCategoryHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory(6));
  }, [dispatch]);

  const categoryArrayData = useSelector((state) => state.categories.category);
  const loading = useSelector((state) => state.categories.loading);
  return [categoryArrayData, loading];
};
export default HomeCategoryHook;
