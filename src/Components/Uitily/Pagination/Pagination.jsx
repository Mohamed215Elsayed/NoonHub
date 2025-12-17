import "./Pagination.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount = 10, onPageChange = () => {}, forcePage }) => {
  const handlePageClick = (data) => {
    onPageChange(data.selected + 1);
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
      forcePage={forcePage ? forcePage - 1 : undefined} // ← الحل السحري
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