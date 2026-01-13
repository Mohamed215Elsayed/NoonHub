import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaUserCircle, FaSignOutAlt, FaColumns } from "react-icons/fa";
import logo from "../../../../Assets/Images/logo.png";
import "./navbar.css";
import NavbarSearchHook from "../../../../Hook/search/navbar-search-hook";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  getLoggedUser,
  loadUserFromStorage,
} from "../../../../Features/Auth/AuthSlice";
import notify from "../../../../Hook/useNotifaction";
import { useEffect } from "react";
function NavBarLogin() {
  const { searchWord, OnChangeSearch } = NavbarSearchHook();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadUserFromStorage());
    if (localStorage.getItem("token")) {
      dispatch(getLoggedUser());
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logoutUser());
    notify("تم تسجيل الخروج بنجاح", "success");
    navigate("/");
  };

  return (
    <>
      <Navbar expand="sm" className="sticky-top main-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} className="logo" alt="Ecommerce Hub" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex search-form mx-auto">
              <FormControl
                type="search"
                placeholder="ابحث عن منتجات، ماركات وغيرها..."
                className="search-input"
                aria-label="Search"
                value={searchWord}
                // value={word}
                onChange={OnChangeSearch}
              />
            </Form>

            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link as={Link} to="/user/wishlist" className="icon-link">
                <FaHeart className="nav-icon" />
                <span className="d-none d-md-inline">المفضلة</span>
              </Nav.Link>

              {user ? (
                <NavDropdown
                  title={
                    <span className="icon-link user-dropdown-toggle">
                      <FaUser className="nav-icon" />
                      <span className="d-none d-md-inline">{user.name}</span>
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                  className="user-dropdown"
                >
                  <NavDropdown.Header className="fw-bold text-muted">
                    مرحبًا، {user.name}
                  </NavDropdown.Header>

                  <NavDropdown.Item
                    as={Link}
                    to={
                      user.role === "admin"
                        ? "/admin/allproducts"
                        : "/user/profile"
                    }
                  >
                    {user.role === "admin" ? (
                      <>
                        <FaColumns className="ms-2" /> لوحة التحكم
                      </>
                    ) : (
                      <>
                        <FaUserCircle className="ms-2" /> حسابي الشخصي
                      </>
                    )}
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logOut} className="text-danger">
                    <FaSignOutAlt className="ms-2" /> تسجيل خروج
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login" className="icon-link">
                  <FaUser className="nav-icon" />
                  <span className="d-none d-md-inline">دخول</span>
                </Nav.Link>
              )}

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

      <div className="navbar-accent-border"></div>
    </>
  );
}

export default NavBarLogin;

/*

  // const [user, setUser] = useState(null);
  // // جلب المستخدم من localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  // console.log(user);
  // تسجيل خروج
  // const logOut = () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   window.location.href = "/";
  // };

   {user.role === "admin" ? (
                    <NavDropdown.Item as={Link} to="/admin/allproducts">
                      لوحة التحكم
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item as={Link} to="/user/profile">
                      حسابي
                    </NavDropdown.Item>
                  )}
*/
