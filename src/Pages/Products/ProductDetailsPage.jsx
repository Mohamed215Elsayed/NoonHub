import { Container } from "react-bootstrap";
import CategoryHeader from "../../Components/Category/CategoryHeader";
import ProductDetails from "../../Components/Products/ProductDetails/ProductDetails";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import RateContainer from "../../Components/Rate/RateContainer/RateContainer";
import { useParams } from "react-router-dom";
import ViewProductsDetalisHook from "../../Hook/product/view-products-detalis-hook";
function ProductDetailsPage() {
  const { id } = useParams();
  const { similarProducts } = ViewProductsDetalisHook(id);
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />
      <Container>
        <ProductDetails />

        <RateContainer />

        <CardProductsContainer
          products={similarProducts}
          title="منتجات قد تعجبك"
        />
      </Container>
    </div>
  );
}

export default ProductDetailsPage;
