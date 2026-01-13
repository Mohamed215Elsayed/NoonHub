import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Features/Categories/CategorySlice";
import brandReducer from "../Features/Brands/BrandSlice";
import SubCategoryReducer from "../Features/SubCategories/SubCategorySlice";
import ProductReducer from "../Features/Products/ProductSlice";
import AuthReducer from "../Features/Auth/AuthSlice";
import ReviewReducer from "../Features/Reviews/ReviewSlice";
import wishListReducer from "../Features/WishList/wishListSlice";
import CouponReducer from "../Features/Coupons/CouponSlice";
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    brands: brandReducer,
    subCategories: SubCategoryReducer,
    products: ProductReducer,
    auth: AuthReducer,
    reviews: ReviewReducer,
    wishLists: wishListReducer,
    coupons: CouponReducer,
  },
});
export default store;
