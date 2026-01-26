import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Pagination from '../../Components/Uitily/Pagination/Pagination';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import ViewAllProductsBrandHook from '../../Hook/product/view-all-products-barnd-hook';
import NoDataFound from '../../Components/Uitily/NoDataFound';
import './ProductCat.css';

const ProductsByBrandPage = () => {
  const { id } = useParams();
  const scrollRef = useRef(null);

  const { items, pageCount, getPage, currentPage, loading } =
    ViewAllProductsBrandHook(id);

  useEffect(() => {
    if (scrollRef.current) {
      const yOffset = -110;
      const y =
        scrollRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [id, currentPage]);

  return (
    <Container key={id} style={{ minHeight: '670px' }} className="py-4">
      <div ref={scrollRef} style={{ height: '0px' }}></div>

      {loading ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: '400px' }}
        >
          <Spinner animation="grow" variant="primary" />
          <p className="mt-3 text-secondary italic font-weight-bold">
            جاري جلب المنتجات...
          </p>
        </div>
      ) : (
        <>
          {items && items.length > 0 ? (
            <>
              <Row className="mb-2">
                <Col className="d-flex justify-content-start">
                  <h3 className="category-title">نتائج الماركة</h3>
                </Col>
              </Row>

              <hr className="mt-0 mb-4" />

              <Row>
                <Col xs={12}>
                  <CardProductsContainer
                    products={items}
                    title=""
                    btntitle=""
                  />
                </Col>
              </Row>

              {pageCount > 1 && (
                <Row className="mt-5">
                  <Col className="d-flex justify-content-center">
                    <Pagination
                      pageCount={pageCount}
                      onPress={getPage}
                      currentPage={currentPage}
                    />
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <NoDataFound
              title="لا توجد منتجات حالياً"
              description="هذه الماركة لا تحتوي على منتجات في الوقت الحالي."
            />
          )}
        </>
      )}
    </Container>
  );
};

export default ProductsByBrandPage;
