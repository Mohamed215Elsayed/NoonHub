import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Features/Categories/CategorySlice";
import brandReducer from "../Features/Brands/BrandSlice";
import SubCategoryReducer from "../Features/SubCategories/SubCategorySlice";
import ProductReducer from "../Features/Products/ProductSlice";
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    brands: brandReducer,
    subCategories: SubCategoryReducer,
    products: ProductReducer,
  },
});
export default store;
