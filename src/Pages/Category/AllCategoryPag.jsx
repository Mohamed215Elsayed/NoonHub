import "./AllCategoryPage.css";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import Pagination from "../../Components/Uitily/Pagination/Pagination";

const AllCategoryPage = () => {
  return (
    <div className="all-cat-wrapper">
      <CategoryContainer />
      <Pagination
        pageCount={20}
        onPageChange={(page) => console.log("الصفحة:", page)}
        forcePage={4}
      />
    </div>
  );
};

export default AllCategoryPage;
