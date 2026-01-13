import Select from "react-select";
import "./FilterDropDownCountResult.css";
// import { useSearchParams } from "react-router-dom";

const sortOptions = [
  { value: "", label: "بدون ترتيب" },
  { value: "-sold", label: "الأكثر مبيعًا" },
  { value: "-ratingsAverage", label: "الأعلى تقييمًا" },
  { value: "price", label: "السعر: من الأقل للأعلى" },
  { value: "-price", label: "السعر: من الأعلى للأقل" },
];
const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "48px",
    borderRadius: "50px",
    border: "2px solid #eee",
    boxShadow: "0 6px 20px rgba(145,89,112,0.1)",
    padding: "0 16px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#915970",
      boxShadow: "0 10px 30px rgba(145,89,112,0.2)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(145,89,112,0.22)",
    marginTop: "8px",
    border: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#915970"
      : state.isFocused
      ? "#fdf6f9"
      : "white",
    color: state.isSelected ? "white" : "#333",
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:active": {
      backgroundColor: "#915970",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#915970",
    fontWeight: "700",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#915970",
    "&:hover": { color: "#7a4d61" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

const FilterDropDownCountResult = ({ getProduct, resultsCount }) => {
  const handleSortChange = (selected) => {
    if (!selected.value) {
      localStorage.removeItem("sortType");
    } else {
      localStorage.setItem("sortType", selected.value);
      console.log(selected.value);
    }
    getProduct();
  };
  const selectedSort =
    sortOptions.find((opt) => opt.value === localStorage.getItem("sortType")) ||
    sortOptions[0];
  // const [searchParams, setSearchParams] = useSearchParams();
  // const currentSort = searchParams.get("sort") || "";
  // const handleSortChange = (selected) => {
  //   setSearchParams((prev) => {
  //     const next = new URLSearchParams(prev);

  //     if (selected.value) {
  //       next.set("sort", selected.value);
  //     } else {
  //       next.delete("sort");
  //     }

  //     next.set("page", 1); // reset pagination
  //     return next;
  //   });
  // };
  //  const selectedSort =
  //   sortOptions.find((opt) => opt.value === currentSort) || sortOptions[0];

  return (
    <div className="search-count-result py-4 px-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        {/* العنوان */}
        {/* <h3 className="result-title">{title}</h3> */}
        <h3 className="result-title">
          هناك <span style={{ color: "#915970" }}>{resultsCount}</span> نتيجة
          بحث
        </h3>

        {/* الـ Dropdown */}
        <div className="sort-dropdown">
          <Select
            options={sortOptions}
            value={selectedSort}
            placeholder="ترتيب حسب"
            isSearchable={false}
            isRtl={true}
            styles={customStyles}
            onChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
};
export default FilterDropDownCountResult;
