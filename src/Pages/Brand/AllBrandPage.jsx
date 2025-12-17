import "./AllBrandPage.css";
import BrandContainer from "../../Components/Brand/BrandContainer";
import Pagination from "../../Components/Uitily/Pagination/Pagination";

const AllBrandPage = () => {
  return (
    <div className="all-brand-page">
      <div className="all-brand-header">
        <h1 className="all-brand-title">كل الماركات</h1>
        <p className="all-brand-subtitle">
          تسوق من أشهر الماركات العالمية والمحلية
        </p>
      </div>

      <BrandContainer />
      {/* <BrandContainer showTitle={true} /> */}
      <BrandContainer showTitle={false} />

      <Pagination
        pageCount={15}
        onPageChange={(page) => console.log("صفحة الماركات:", page)}
        forcePage={1}
      />
    </div>
  );
};

export default AllBrandPage;
