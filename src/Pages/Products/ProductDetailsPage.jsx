import { Container } from "react-bootstrap";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import ProductDetails from "../../Components/Products/ProductDetails/ProductDetails";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import RateContainer from "../../Components/Rate/RateContainer/RateContainer";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "../../Hook/product/view-products-detalis-hook";

function ProductDetailsPage() {
  const { prodID } = useParams();
  const { similarProducts, item } = ViewProductsDetalisHook(prodID);
  // ViewProductsDetalisHook(prodID);
  // const item = useSelector((state) => state.products.oneProduct?.data);
  // const similarProducts = useSelector((state) =>
  //   state.products.productLike?.data?.slice(0, 4)
  // );

  const rateAvg = item?.ratingsAverage || 0;
  const rateQty = item?.ratingsQuantity || 0;

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ProductDetails />
        <RateContainer rateAvg={rateAvg} rateQty={rateQty} />

        <CardProductsContainer
          products={similarProducts}
          title="منتجات قد تعجبك"
        />
      </Container>
    </div>
  );
}

export default ProductDetailsPage;
