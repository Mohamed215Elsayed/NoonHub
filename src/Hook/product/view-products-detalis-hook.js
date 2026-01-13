import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  getProductLike,
} from "../../Features/Products/ProductSlice";
import noImgage from "../../Assets/Images/cancel-photo.jpg";

const ViewProductsDetalisHook = (prodID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (prodID) {
      dispatch(getOneProduct(prodID));
    }
  }, [dispatch, prodID]);

  const oneProductResponse = useSelector((state) => state.products.oneProduct);
  const productLikeResponse = useSelector(
    (state) => state.products.productLike
  ); // مصفوفة المنتجات المشابهة
  const item = oneProductResponse?.data || {};
  const cat = item.category || {}; //thanks to populate in db model
  const brand = item.brand || {};

  let images =
    item?.images?.length > 0
      ? item.images.map((img) => ({ original: img }))
      : [{ original: noImgage }];
  useEffect(() => {
    if (item.category) {
      const catId = item.category._id || item.category;
      dispatch(getProductLike(catId));
    }
  }, [dispatch, item.category]);
  const similarProducts = productLikeResponse?.data?.slice(0, 4) || [];
  return { item, images, cat, brand, similarProducts };
};
export default ViewProductsDetalisHook;
