import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishListPage } from '../../Features/WishList/wishListSlice';

const CardContainerHook = () => {
  const dispatch = useDispatch();
  const { allWishList, loading, paginationResult } = useSelector(
    (state) => state.wishLists
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      if (token && user?.role === 'user') {
        await dispatch(getProductWishListPage(1));
      }
    };

    fetchWishlist();
  }, [dispatch, user]);

  const onPress = async (page) => {
    await dispatch(getProductWishListPage(page));
  };
  const pageCount = paginationResult?.numberOfPages || 0;
  const currentPage = paginationResult?.currentPage || 1;
  return { wishList: allWishList, loading, onPress, pageCount, currentPage };
};

export default CardContainerHook;
