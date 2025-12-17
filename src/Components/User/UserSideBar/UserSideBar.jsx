import { NavLink } from "react-router-dom";
import "./UserSideBar.css";
import {
  FaClipboardList,
  FaHeart,
  FaMapMarkedAlt,
  FaUserEdit,
} from "react-icons/fa";

const UserSideBar = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "user-side-text-link active" : "user-side-text-link";

  return (
    <div className="sidebar">
      <div className="d-flex flex-column">
        <NavLink to="/user/allorders" className={getNavLinkClass}>
          <div className="user-side-text d-flex align-items-center">
            <FaClipboardList className="ms-2 icon-style" />
            إدارة الطلبات
          </div>
        </NavLink>

        <NavLink to="/user/wishlist" className={getNavLinkClass}>
          <div className="user-side-text d-flex align-items-center">
            <FaHeart className="ms-2 icon-style" />
            المنتجات المفضلة
          </div>
        </NavLink>

        <NavLink to="/user/addresses" className={getNavLinkClass}>
          <div className="user-side-text d-flex align-items-center">
            <FaMapMarkedAlt className="ms-2 icon-style" />
            العناوين الشخصية
          </div>
        </NavLink>

        <NavLink to="/user/profile" className={getNavLinkClass}>
          <div className="user-side-text d-flex align-items-center">
            <FaUserEdit className="ms-2 icon-style" />
            الملف الشخصي
          </div>
        </NavLink>
      </div>
    </div>
  );
};
export default UserSideBar;
