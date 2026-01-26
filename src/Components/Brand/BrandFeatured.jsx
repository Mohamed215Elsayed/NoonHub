import { Container, Row } from 'react-bootstrap';
import SubTitle from '../Uitily/ButtonsTitles/SubTitle';
import BrandCard from './BrandCard';
import BrandCardSkeleton from './BrandCardSkeleton';
import CategoryEmptyState from '../Uitily/CategoryEmptyState';
import HomeBrandHook from '../../Hook/brand/home-brand-hook';
import './BrandFeatured.css';

const BrandFeatured = ({
  title = 'أشهر الماركات',
  btntitle = 'عرض الكل',
  pathText = '/allbrand',
}) => {
  const [brand, loading] = HomeBrandHook();
  const brands = brand?.data?.slice(0, 6) || [];
  const SKELETON_COUNT = 6;

  return (
    <section className="brand-featured-section py-5">
      <Container>
        <SubTitle title={title} btntitle={btntitle} pathText={pathText} />
        <Row className="my-2 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4 justify-content-center">
          {loading ? (
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <BrandCardSkeleton key={i} />
            ))
          ) : brands.length > 0 ? (
            brands.map((item) => (
              <BrandCard
                key={item._id}
                id={item._id}
                img={item.image}
                name={item.name}
              />
            ))
          ) : (
            <CategoryEmptyState />
          )}
        </Row>
      </Container>
    </section>
  );
};

export default BrandFeatured;
