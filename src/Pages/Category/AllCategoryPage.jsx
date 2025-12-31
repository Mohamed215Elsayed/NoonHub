import "./AllCategoryPage.css";
import CategoryContainer from "../../Components/Category/CategoryContainer";
import AllCategoryHook from "../../Hook/Category/all-category-page-hook";
import Pagination from "../../Components/Uitily/Pagination/Pagination";

const AllCategoryPage = () => {
  const [category, loading, pageCount, currentPage, getPage] =
    AllCategoryHook();

  return (
    <div className="all-cat-wrapper">
      <CategoryContainer catData={category.data} loading={loading} />
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

export default AllCategoryPage;
