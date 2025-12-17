// import { Link } from "react-router-dom";
// import { Navbar, Container, Form, FormControl, Nav } from "react-bootstrap";
// import logo from "../../../../Assets/Images/logo.png";
// import login from "../../../../Assets/Images/login.png";
// import cart from "../../../../Assets/Images/cart.png";
// import "./navbar.css";

// function NavBarLogin() {
//   return (
//     <Navbar expand="sm" className="sticky-top navbar" bg="dark" variant="dark">
//       <Container>
//         {/* Logo */}
//         <Navbar.Brand as={Link} to="/">
//           <img src={logo} className="logo" alt="store logo" />
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         <Navbar.Collapse id="basic-navbar-nav">
//           {/* Search */}
//           <Form className="d-flex w-100 mx-3">
//             <FormControl
//               type="search"
//               placeholder="ابحث..."
//               className="text-center"
//               aria-label="Search"
//             />
//           </Form>

//           {/* Navigation */}
//           <Nav className="ms-auto d-flex align-items-center">
//             <Nav.Link
//               as={Link}
//               to="/login"
//               className="nav-link-item d-flex align-items-center gap-2"
//             >
//               <img src={login} className="icon-img" alt="login icon" />
//               <span>دخول</span>
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/cart"
//               className="nav-link-item d-flex align-items-center gap-2"
//             >
//               <div className="cart-img-container">
//                 <img src={cart} className="icon-img" alt="cart icon" />
//               </div>

//               <span>العربة</span>
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavBarLogin;

import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  Badge,
} from "react-bootstrap";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import logo from "../../../../Assets/Images/logo.png";
import "./navbar.css";

function NavBarLogin() {
  return (
    <>
      <Navbar expand="sm" className="sticky-top main-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} className="logo" alt="Ecommerce Hub" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search Bar */}
            <Form className="d-flex search-form mx-auto">
              <FormControl
                type="search"
                placeholder="ابحث عن منتجات، ماركات وغيرها..."
                className="search-input"
                aria-label="Search"
              />
            </Form>

          
            <Nav className="ms-auto align-items-center gap-3">
           
              <Nav.Link as={Link} to="/user/wishlist" className="icon-link">
                <FaHeart className="nav-icon" />
                <span className="d-none d-md-inline">المفضلة</span>
              </Nav.Link>

              {/* Login */}
              <Nav.Link as={Link} to="/login" className="icon-link">
                <FaUser className="nav-icon" />
                <span className="d-none d-md-inline">دخول</span>
              </Nav.Link>

              {/* Cart */}
              <Nav.Link
                as={Link}
                to="/cart"
                className="icon-link position-relative"
              >
                <FaShoppingCart className="nav-icon" />
                <Badge className="cart-badge">3</Badge>
                <span className="d-none d-md-inline">العربة</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* شريط رفيع بلون البرايماري تحت الناف بار */}
      <div className="navbar-accent-border"></div>
    </>
  );
}

export default NavBarLogin;
