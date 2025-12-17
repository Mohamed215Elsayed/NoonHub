import { Row } from "react-bootstrap";
import "./UserWishlist.css";
import Pagination from "../../Uitily/Pagination/Pagination";
import ProductCard from "../../Products/ProductCard/ProductCard";

const UserWishlist = () => {
  return (
    <div className="user-favorite-wrapper">
      <div className="content-title pb-4">
        قائمة المفضلة ({/* عدد المنتجات هنا */})
      </div>

      <Row className="justify-content-start">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Row>

      <Pagination />
    </div>
  );
};

export default UserWishlist;
