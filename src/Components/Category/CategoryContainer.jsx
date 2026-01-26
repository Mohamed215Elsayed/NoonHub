import { Container, Row } from 'react-bootstrap';
import CategoryCard from './CategoryCard';
import './CategoryContainer.css';
import CategorySkeleton from '../Uitily/Skelton/CategorySkeleton';
import CategoryEmptyState from '../Uitily/CategoryEmptyState';

const CategoryContainer = ({ catData, loading }) => {
  
  return (
    <Container className="cat-page py-5">
      <h2 className="cat-page-title">كل التصنيفات</h2>
      <div className="cat-page-line"></div>

      <Row className="g-4 g-lg-5 justify-content-center">
        {loading ? (
          <CategorySkeleton count={6} />
        ) : catData && catData.length > 0 ? (
          catData.map((cat, idx) => (
            <CategoryCard
              key={cat._id || idx}
              img={cat.image}
              name={cat.name}
              id={cat._id}
            />
          ))
        ) : (
          <CategoryEmptyState />
        )}
      </Row>
    </Container>
  );
};

export default CategoryContainer;
