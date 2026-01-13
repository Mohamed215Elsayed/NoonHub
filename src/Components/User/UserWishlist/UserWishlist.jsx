import { Row } from "react-bootstrap";
import "./UserWishlist.css";
import Pagination from "../../Uitily/Pagination/Pagination";
import ProductCard from "../../Products/ProductCard/ProductCard";
import CategorySkeleton from "../../Uitily/Skelton/CategorySkeleton";
import CardContainerHook from "./../../../Hook/wishList/card-container-hook";

const UserWishlist = () => {
  const { wishList, loading, onPress, pageCount, currentPage } =
    CardContainerHook();

  return (
    <div className="user-favorite-wrapper">
      <div className="content-title pb-4">
        قائمة المفضلة ({wishList ? wishList.length : 0})
      </div>

      <Row className="justify-content-start">
        {loading ? (
          <div className="d-flex justify-content-center my-5 w-100">
            <CategorySkeleton count={4} />
          </div>
        ) : wishList && wishList.length > 0 ? (
          wishList.map((item) => <ProductCard key={item._id} product={item} />)
        ) : (
          <div className="w-100 text-center my-5">
            <h4 className="text-muted">لا توجد منتجات في المفضلة حالياً</h4>
          </div>
        )}
      </Row>

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPress={onPress}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default UserWishlist;
