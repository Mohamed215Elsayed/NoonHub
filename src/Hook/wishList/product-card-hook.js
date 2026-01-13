import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "../../Features/WishList/wishListSlice";
import notify from "../useNotifaction";

const ProductCardHook = (product) => {
  const dispatch = useDispatch();

  const isFav = useSelector((state) =>
    state.wishLists.allWishList.some((item) => item._id === product?._id)
  );

  const [loading, setLoading] = useState(false);

  const handleFav = useCallback(async () => {
    if (!product?._id) return;
    setLoading(true);
    try {
      if (isFav) {
        await dispatch(removeProductFromWishList(product._id)).unwrap();
        notify("تم حذف المنتج من المفضلة", "warn");
      } else {
        await dispatch(
          addProductToWishList({ productId: product._id })
        ).unwrap();
        notify("تمت إضافة المنتج للمفضلة", "success");
      }
    } catch (err) {
      notify(
        err?.message || err?.data?.message || "حدث خطأ غير متوقع",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch, isFav, product?._id]);

  return { isFav, handleFav, loading };
};

export default ProductCardHook;
