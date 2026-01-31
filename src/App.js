import ProtectedRoute from './Routes/ProtectedRoute';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import NavBarLogin from './Components/Uitily/layouts/Navbar/NavBarLogin';
import Footer from './Components/Uitily/layouts/Footer/Footer';
import ScrollToTopButton from './Components/Uitily/ScrollToTop/ScrollToTopButton';
import LoginPage from './Pages/Auth/login/LoginPage';
import RegisterPage from './Pages/Auth/register/RegisterPage';
import AllCategoryPage from './Pages/Category/AllCategoryPage';
import AllBrandPage from './Pages/Brand/AllBrandPage';
import ShopProductsPage from './Pages/Products/ShopProductsPage';
import ProductDetailsPage from './Pages/Products/ProductDetailsPage';
import CartPage from './Pages/Cart/CartPage';
import ChoosePayMethoudPage from './Pages/Checkout/ChoosePayMethoudPage';
import AdminAllProductsPage from './Pages/Admin/AdminAllProductsPage';
import AdminAllOrdersPage from './Pages/Admin/AdminAllOrdersPage';
import AdminOrderDetailsPage from './Pages/Admin/AdminOrderDetailsPage';
import AdminAddBrandPage from './Pages/Admin/AdminAddBrandPage';
import AdminAddCategoryPage from './Pages/Admin/AdminAddCategoryPage';
import AdminAddSubCategoryPage from './Pages/Admin/AdminAddSubCategoryPage';
import AdminAddProductsPage from './Pages/Admin/AdminAddProductsPage';
import UserAllOrdersPage from './Pages/User/UserAllOrdersPage';
import UserWishlistPage from './Pages/User/UserWishlistPage';
import UserAllAddresPage from './Pages/User/UserAllAddresPage';
import UserAddAddressPage from './Pages/User/UserAddAddressPage';
import UserEditAddressPage from './Pages/User/UserEditAddressPage';
import UserProfilePage from './Pages/User/UserProfilePage';
import AdminEditProductsPage from './Pages/Admin/AdminEditProductsPage';
import ForgetPasswordPage from './Pages/Auth/ForgetPassword/ForgetPasswordPage';
import VerifyPasswordPage from './Pages/Auth/VerifyPassword/VerifyPasswordPage';
import ResetPasswordPage from './Pages/Auth/ResetPassword/ResetPasswordPage';
import AdminAddCouponPage from './Pages/Admin/AdminAddCouponPage';
import AdminEditCouponPage from './Pages/Admin/AdminEditCouponPage';
import ProductsByCategoryPage from './Pages/Products/ProductsByCategoryPage';
import ProductsByBrandPage from './Pages/Products/ProductsByBrandPage';
import AdminEditBrandPage from './Pages/Admin/AdminEditBrandPage';
import AdminAllBrandsPage from './Pages/Admin/AdminAllBrandsPage';
import AdminAllCategoriesPage from './Pages/Admin/AdminAllCategoriesPage';
import AdminEditCategoryPage from './Pages/Admin/AdminEditCategoryPage';

function App() {
  return (
    <div className="font">
      <NavBarLogin />
      <Routes>
        {/* ================================================ */}
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/user/verify-code" element={<VerifyPasswordPage />} />
        <Route path="/user/reset-password" element={<ResetPasswordPage />} />

        <Route path="/allcategory" element={<AllCategoryPage />} />
        <Route path="/allbrand" element={<AllBrandPage />} />
        <Route path="/products" element={<ShopProductsPage />} />

        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/products/category/:id"
          element={<ProductsByCategoryPage />}
        />
        <Route path="/products/brand/:id" element={<ProductsByBrandPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ================================================ */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
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
          <Route
            path="/admin/editproduct/:id"
            element={<AdminEditProductsPage />}
          />
          <Route path="/admin/allbrands" element={<AdminAllBrandsPage />} />
          <Route
            path="/admin/allcategories"
            element={<AdminAllCategoriesPage />}
          />
          <Route path="/admin/editbrand/:id" element={<AdminEditBrandPage />} />
          <Route
            path="/admin/editcategory/:id"
            element={<AdminEditCategoryPage />}
          />
        </Route>
        {/* ================================================ */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/addcoupon" element={<AdminAddCouponPage />} />
          <Route
            path="/admin/editcoupon/:id"
            element={<AdminEditCouponPage />}
          />
        </Route>
        {/* ================================================ */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user/allorders" element={<UserAllOrdersPage />} />
          <Route path="/user/wishlist" element={<UserWishlistPage />} />
          <Route path="/user/addresses" element={<UserAllAddresPage />} />
          <Route path="/user/add-address" element={<UserAddAddressPage />} />
          <Route
            path="/user/edit-address/:id"
            element={<UserEditAddressPage />}
          />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/order/paymethoud" element={<ChoosePayMethoudPage />} />
        </Route>
      </Routes>
      {/* ================================================ */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* ================================================ */}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;
