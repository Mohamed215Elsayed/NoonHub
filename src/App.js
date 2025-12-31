import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/HomePage";
import NavBarLogin from "./Components/Uitily/layouts/Navbar/NavBarLogin";
import Footer from "./Components/Uitily/layouts/Footer/Footer";
import ScrollToTopButton from "./Components/Uitily/ScrollToTop/ScrollToTopButton";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import AllCategoryPage from "./Pages/Category/AllCategoryPage";
import AllBrandPage from "./Pages/Brand/AllBrandPage";
import ShopProductsPage from "./Pages/Products/ShopProductsPage";
import ProductDetailsPage from "./Pages/Products/ProductDetailsPage";
import CartPage from "./Pages/Cart/CartPage";
import ChoosePayMethoudPage from "./Pages/Checkout/ChoosePayMethoudPage";
import AdminAllProductsPage from "./Pages/Admin/AdminAllProductsPage";
import AdminAllOrdersPage from "./Pages/Admin/AdminAllOrdersPage";
import AdminOrderDetailsPage from "./Pages/Admin/AdminOrderDetailsPage";
import AdminAddBrandPage from "./Pages/Admin/AdminAddBrandPage";
import AdminAddCategoryPage from "./Pages/Admin/AdminAddCategoryPage";
import AdminAddSubCategoryPage from "./Pages/Admin/AdminAddSubCategoryPage";
import AdminAddProductsPage from "./Pages/Admin/AdminAddProductsPage";
import UserAllOrdersPage from "./Pages/User/UserAllOrdersPage";
import UserWishlistPage from "./Pages/User/UserWishlistPage";
import UserAllAddresPage from "./Pages/User/UserAllAddresPage";
import UserAddAddressPage from "./Pages/User/UserAddAddressPage";
import UserEditAddressPage from "./Pages/User/UserEditAddressPage";
import UserProfilePage from "./Pages/User/UserProfilePage";
import AdminEditProductsPage from "./Pages/Admin/AdminEditProductsPage";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="font">
      <NavBarLogin />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/allcategory" element={<AllCategoryPage />} />
        <Route path="/allbrand" element={<AllBrandPage />} />
        <Route path="/products" element={<ShopProductsPage />} />
        <Route
          path="/products/category/:categoryId"
          element={<ShopProductsPage />}
        />
        {/* زرار الخصم */}
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/paymethoud" element={<ChoosePayMethoudPage />} />
        <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
        <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetailsPage />} />
        <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
        <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
        <Route
          path="/admin/addsubcategory"
          element={<AdminAddSubCategoryPage />}
        />
        <Route path="/admin/addproduct" element={<AdminAddProductsPage />} />
        <Route path="/user/allorders" element={<UserAllOrdersPage />} />
        <Route path="/user/wishlist" element={<UserWishlistPage />} />
        <Route path="/user/addresses" element={<UserAllAddresPage />} />
        <Route path="/user/add-address" element={<UserAddAddressPage />} />
        <Route path="/user/edit-address" element={<UserEditAddressPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route
          path="/admin/editproduct/:id"
          element={<AdminEditProductsPage />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
