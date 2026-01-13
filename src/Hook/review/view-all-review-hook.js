import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewProduct } from "../../Features/Reviews/ReviewSlice";

const ViewAllReviewHook = (prodID, limit = 5) => {
  const dispatch = useDispatch();

  const { allReviewProduct, pagination, loadingGet, error } = useSelector(
    (state) => state.reviews
  );

  const fetchReviewsByPage = useCallback(
    (page = 1) => {
      dispatch(
        getAllReviewProduct({
          prodID,
          page,
          limit,
        })
      );
    },
    [dispatch, prodID, limit]
  );

  useEffect(() => {
    if (prodID) {
      fetchReviewsByPage(1);
    }
  }, [prodID, fetchReviewsByPage]);

  return {
    allReviewProduct,
    pagination,
    loadingGet,
    error,
    fetchReviewsByPage,
  };
};

export default ViewAllReviewHook;
