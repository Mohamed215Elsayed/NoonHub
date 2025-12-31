import "./Pagination.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPress, currentPage }) => {
  // إرسال رقم الصفحة الحقيقي للأكشن (1-based index)
  const handlePageClick = (data) => {
    onPress(data.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ReactPaginate
      previousLabel="السابق"
      nextLabel="التالي"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      onPageChange={handlePageClick}
      forcePage={currentPage ? currentPage - 1 : 0}
      containerClassName="pagination-container"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link prev-btn"
      nextClassName="page-item"
      nextLinkClassName="page-link next-btn"
      breakClassName="page-item"
      breakLinkClassName="page-link break-me"
      activeClassName="active"
      disabledClassName="disabled"
    />
  );
};

export default Pagination;
