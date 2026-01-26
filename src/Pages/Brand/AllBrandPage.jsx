import './AllBrandPage.css';
import BrandContainer from '../../Components/Brand/BrandContainer';
import Pagination from '../../Components/Uitily/Pagination/Pagination';
import AllBrandHook from '../../Hook/brand/all-brand-page-hook';
import { useEffect } from 'react';

const AllBrandPage = () => {
  const [brand, loading, pageCount, currentPage, getPage] = AllBrandHook();
  useEffect(() => {
    const scrollToLocation = () => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth',
      });
    };
    const timeoutId = setTimeout(scrollToLocation,10);
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  return (
    <div className="all-brand-page">
      <div className="all-brand-header">
        <h1 className="all-brand-title">كل الماركات</h1>
        <p className="all-brand-subtitle">
          تسوق من أشهر الماركات العالمية والمحلية
        </p>
      </div>

      <BrandContainer brand={brand.data} loading={loading} />
      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPress={getPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default AllBrandPage;
