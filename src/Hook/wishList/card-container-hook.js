import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishListPage } from '../../Features/WishList/wishListSlice'; //getProductWishList,

const CardContainerHook = () => {
  const dispatch = useDispatch();
  const { allWishList, loading, paginationResult } = useSelector(
    (state) => state.wishLists
  );

  // useEffect(() => {
  //   if (allWishList.length === 0 && !loading) {
  //     //   dispatch(getProductWishList());
  //     dispatch(getProductWishListPage(1));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    const fetchWishlist = async () => {
      await dispatch(getProductWishListPage(1));
    };
    fetchWishlist();
  }, [dispatch]);

  const onPress = async (page) => {
    await dispatch(getProductWishListPage(page));
  };
  const pageCount = paginationResult?.numberOfPages || 0;
  const currentPage = paginationResult?.currentPage || 1;
  return { wishList: allWishList, loading, onPress, pageCount, currentPage };
};

export default CardContainerHook;
