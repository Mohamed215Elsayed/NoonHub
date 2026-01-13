// import { NavLink } from "react-router-dom";
// import "./AdminSideBar.css";
// import {
//   FaClipboardList,
//   FaBoxes,
//   FaTags,
//   FaListAlt,
//   FaLayerGroup,
//   FaPlusSquare,
//   FaTicketAlt,
// } from "react-icons/fa";

// function AdminSideBar() {
//   // دالة لتحديد الكلاس النشط (Active Class)
//   const getNavLinkClass = ({ isActive }) =>
//     isActive ? "admin-side-text-link active" : "admin-side-text-link";

//   return (
//     <div className="sidebar">
//       <div className="d-flex flex-column">
//         <NavLink to="/admin/allorders" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaClipboardList className="ms-2 icon-style" />
//             إدارة الطلبات
//           </div>
//         </NavLink>

//         <NavLink to="/admin/allproducts" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaBoxes className="ms-2 icon-style" />
//             إدارة المنتجات
//           </div>
//         </NavLink>

//         <NavLink to="/admin/addbrand" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaTags className="ms-2 icon-style" />
//             اضف ماركة
//           </div>
//         </NavLink>

//         <NavLink to="/admin/addcategory" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaListAlt className="ms-2 icon-style" />
//             اضف تصنيف
//           </div>
//         </NavLink>

//         <NavLink to="/admin/addsubcategory" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaLayerGroup className="ms-2 icon-style" />
//             اضف تصنيف فرعي
//           </div>
//         </NavLink>

//         <NavLink to="/admin/addproduct" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaPlusSquare className="ms-2 icon-style" />
//             اضف منتج
//           </div>
//         </NavLink>
//         <NavLink to="/admin/addcoupon" className={getNavLinkClass}>
//           <div className="admin-side-text d-flex align-items-center">
//             <FaTicketAlt className="ms-2 icon-style" />
//             اضف كوبون
//           </div>
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export default AdminSideBar;

import { NavLink } from "react-router-dom";
import "./AdminSideBar.css";
import {
  FaClipboardList,
  FaBoxes,
  FaTags,
  FaListAlt,
  FaLayerGroup,
  FaPlusSquare,
  FaTicketAlt,
} from "react-icons/fa";

function AdminSideBar() {
  const sidebarLinks = [
    {
      to: "/admin/allorders",
      text: "إدارة الطلبات",
      icon: <FaClipboardList />,
    },
    { to: "/admin/allproducts", text: "إدارة المنتجات", icon: <FaBoxes /> },
    { to: "/admin/addbrand", text: "أضف ماركة", icon: <FaTags /> },
    { to: "/admin/addcategory", text: "أضف تصنيف", icon: <FaListAlt /> },
    {
      to: "/admin/addsubcategory",
      text: "أضف تصنيف فرعي",
      icon: <FaLayerGroup />,
    },
    { to: "/admin/addproduct", text: "أضف منتج", icon: <FaPlusSquare /> },
    { to: "/admin/addcoupon", text: "أضف كوبون", icon: <FaTicketAlt /> },
  ];

  return (
    <div className="sidebar">
      <div className="d-flex flex-column gap-1">
        {sidebarLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "admin-side-text-link active" : "admin-side-text-link"
            }
          >
            <div className="admin-side-text d-flex align-items-center">
              {/* الأيقونة */}
              <span className="icon-style mx-2">{link.icon}</span>
              {/* النص */}
              <span className="link-text">{link.text}</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AdminSideBar;
