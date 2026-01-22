import { configureStore } from '@reduxjs/toolkit';

import userAddressReducer from '../Features/Addresses/UserAddressSlice';
import AuthReducer from '../Features/Auth/AuthSlice';
import brandReducer from '../Features/Brands/BrandSlice';
import CartReducer from '../Features/Cart/CartSlice';
import categoryReducer from '../Features/Categories/CategorySlice';
import CouponReducer from '../Features/Coupons/CouponSlice';
import ProductReducer from '../Features/Products/ProductSlice';
import ReviewReducer from '../Features/Reviews/ReviewSlice';
import SubCategoryReducer from '../Features/SubCategories/SubCategorySlice';
import wishListReducer from '../Features/WishList/wishListSlice';

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
    userAddress: userAddressReducer,
    cart:CartReducer,
  },
});
export default store;
