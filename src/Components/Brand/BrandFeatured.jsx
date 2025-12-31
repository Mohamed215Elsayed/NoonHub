import { Container, Row } from "react-bootstrap";
import SubTitle from "../Uitily/ButtonsTitles/SubTitle";
import BrandCard from "./BrandCard";
import "./BrandFeatured.css";
import CategorySkeleton from "../Uitily/Skelton/CategorySkeleton";
import CategoryEmptyState from "../Uitily/CategoryEmptyState";
import HomeBrandHook from "../../Hook/brand/home-brand-hook";

const BrandFeatured = ({
  title = "أشهر الماركات",
  btntitle = "عرض الكل",
  pathText = "/allbrand",
}) => {
  const [brand, loading] = HomeBrandHook();

  const brands = brand?.data?.slice(0, 6) || [];

  return (
    <section className="brand-featured py-5">
      <Container>
        <SubTitle title={title} btntitle={btntitle} pathText={pathText} />

        <Row className="my-2 d-flex justify-content-between">
          {loading && <CategorySkeleton count={6} />}
          {!loading &&
            brands.length > 0 &&
            brands.map((item) => <BrandCard key={item._id} img={item.image} />)}

          {!loading && brands.length === 0 && <CategoryEmptyState />}
        </Row>
      </Container>
    </section>
  );
};
export default BrandFeatured;
