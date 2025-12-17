import Select from "react-select";
import "./FilterDropDownCountResult.css";
const sortOptions = [
  { value: "best-selling", label: "الأكثر مبيعًا" },
  { value: "highest-rated", label: "الأعلى تقييمًا" },
  { value: "price-low-high", label: "السعر: من الأقل للأعلى" },
  { value: "price-high-low", label: "السعر: من الأعلى للأقل" },
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

const FilterDropDownCountResult = ({ title = "120 نتيجة بحث" }) => {
  return (
    <div className="search-count-result py-4 px-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        {/* العنوان */}
        <h3 className="result-title">{title}</h3>

        {/* الـ Dropdown */}
        <div className="sort-dropdown">
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            placeholder="ترتيب حسب"
            isSearchable={false}
            isRtl={true}
            styles={customStyles}
            onChange={(selected) => {
              console.log("تم اختيار الترتيب:", selected.value);
              // هنا هتحط الـ sort logic بتاعك
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default FilterDropDownCountResult;

/*
import React from 'react'
import UnopDropdown from "unop-react-dropdown";
import sort from '../../images/sort.png'
const SearchCountResult = ({title}) => {
    const handler=()=> {

    }
    return (
        <div className="d-flex justify-content-between pt-3 px-2">
            <div className="sub-tile">{title}</div>
            <div className="search-count-text d-flex ">
                <UnopDropdown
                    onAppear={handler}
                    onDisappearStart={handler}
                    trigger={
                        <p className="mx-1">
                            <img
                                width="20px"
                                height="20px"
                                className="ms-1"
                                src={sort}
                                alt=""
                            />
                            ترتيب حسب
                        </p>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                    <div className="card-filter">
                        <div className="border-bottom card-filter-item">الاكثر مبيعا</div>
                        <div className="border-bottom card-filter-item">الاعلي تقييما</div>
                        <div className="border-bottom card-filter-item">
                            السعر من الاقل للاعلي
                        </div>
                        <div className=" card-filter-item">السعر من الاعلي للاقل</div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}

export default SearchCountResult
*/
