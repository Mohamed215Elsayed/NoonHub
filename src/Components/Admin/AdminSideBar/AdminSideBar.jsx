import { NavLink } from "react-router-dom";
import "./AdminSideBar.css";
import {
  FaClipboardList,
  FaBoxes,
  FaTags,
  FaListAlt,
  FaLayerGroup,
  FaPlusSquare,
} from "react-icons/fa";

function AdminSideBar() {
  // دالة لتحديد الكلاس النشط (Active Class)
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "admin-side-text-link active" : "admin-side-text-link";

  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <NavLink to="/admin/allorders" className={getNavLinkClass}>
          <div className="admin-side-text d-flex align-items-center">
            <FaClipboardList className="ms-2 icon-style" />
            إدارة الطلبات
          </div>
        </NavLink>

        <NavLink to="/admin/allproducts" className={getNavLinkClass}>
          <div className="admin-side-text d-flex align-items-center">
            <FaBoxes className="ms-2 icon-style" />
            إدارة المنتجات
          </div>
        </NavLink>

        <NavLink to="/admin/addbrand" className={getNavLinkClass}>
          <div className="admin-side-text d-flex align-items-center">
            <FaTags className="ms-2 icon-style" />
            اضف ماركة
          </div>
        </NavLink>

        <NavLink to="/admin/addcategory" className={getNavLinkClass}>
          <div className="admin-side-text d-flex align-items-center">
            <FaListAlt className="ms-2 icon-style" />
            اضف تصنيف
          </div>
        </NavLink>

        <NavLink to="/admin/addsubcategory" className={getNavLinkClass}>
          <div className="admin-side-text d-flex align-items-center">
            <FaLayerGroup className="ms-2 icon-style" />
            اضف تصنيف فرعي
          </div>
        </NavLink>

        <NavLink to="/admin/addproduct" className={getNavLinkClass}>
          <div className="admin-side-text d-flex align-items-center">
            <FaPlusSquare className="ms-2 icon-style" />
            اضف منتج
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default AdminSideBar;
