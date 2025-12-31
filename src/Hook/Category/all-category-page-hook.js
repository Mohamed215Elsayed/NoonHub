import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {getAllCategory,getAllCategoryPage,
} from "../../Features/Categories/CategorySlice";
const AllCategoryHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory(6));
  }, [dispatch]);

  const { category, loading } = useSelector(
    (state) => state.categories,
    shallowEqual
  );

  const pageCount = category?.pagination?.numberOfPages || 0;
  const currentPage = category?.pagination?.currentPage || 1;

  const getPage = (page) => {
    dispatch(getAllCategoryPage(page));
  };
  return [category, loading, pageCount, currentPage, getPage];
};
export default AllCategoryHook;
