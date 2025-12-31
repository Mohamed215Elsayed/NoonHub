import { Container, Row } from "react-bootstrap";
import SubTitle from "../Uitily/ButtonsTitles/SubTitle";
import CategoryCard from "../Category/CategoryCard";
import CategoryEmptyState from "../Uitily/CategoryEmptyState";
import CategorySkeleton from "../Uitily/Skelton/CategorySkeleton";
import HomeCategoryHook from "../../Hook/Category/home-category-hook";
const HomeCategory = () => {
  const [categoryArrayData, loading] = HomeCategoryHook();
  return (
    <Container className="my-5">
      <SubTitle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />

      <Row className="justify-content-center g-4 mt-3">
        {loading ? (
          <CategorySkeleton count={6} />
        ) : categoryArrayData?.data?.length > 0 ? (
          categoryArrayData.data
            .slice(0, 6)
            .map((itemcat, index) => (
              <CategoryCard
                key={itemcat._id}
                img={itemcat.image}
                title={itemcat.name}
              />
            ))
        ) : (
          <CategoryEmptyState />
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
