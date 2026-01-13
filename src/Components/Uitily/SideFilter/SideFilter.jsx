import SidebarSearchHook from "../../../Hook/search/sidebar-search-hook";
import "./SideFilter.css";
const SideFilter = () => {
  const {
    category,
    brand,
    catChecked,
    brandChecked,
    clickCategory,
    clickBrand,
    priceFrom,
    priceTo,
    onChangePriceFrom,
    onChangePriceTo,
  } = SidebarSearchHook();

  return (
    <div className="side-filter">
      {/* الفئة */}
      <div className="filter-section">
        <h3 className="filter-title">الفئة</h3>
        <label className="filter-checkbox">
          <input type="checkbox" value="0" onChange={clickCategory} />
          <span className="checkmark"></span>
          الكل
        </label>
        {category.length ? (
          category.map((item) => (
            <label className="filter-checkbox" key={item._id}>
              <input
                type="checkbox"
                value={item._id}
                onChange={clickCategory}
                checked={catChecked.includes(item._id)}
              />
              <span className="checkmark"></span>
              {item.name}
            </label>
          ))
        ) : (
          <h6>لا يوجد تصنيفات</h6>
        )}
      </div>

      {/* الماركة */}
      <div className="filter-section">
        <h3 className="filter-title">الماركة</h3>
        <label className="filter-checkbox">
          <input type="checkbox" value="0" onChange={clickBrand} />
          <span className="checkmark"></span>
          الكل
        </label>

        {brand.length ? (
          brand.map((item) => (
            <label key={item._id} className="filter-checkbox">
              <input
                type="checkbox"
                value={item._id}
                onChange={clickBrand}
                checked={brandChecked.includes(item._id)}
              />
              <span className="checkmark"></span>
              {item.name}
            </label>
          ))
        ) : (
          <h6>لا يوجد ماركات</h6>
        )}
      </div>

      {/* السعر */}
      <div className="filter-section">
        <h3 className="filter-title">السعر</h3>
        <div className="price-range">
          <div className="price-input">
            <span>من</span>
            <input
              type="number"
              placeholder="0"
              value={priceFrom}
              onChange={onChangePriceFrom}
            />
            {/* <span>ج.م</span> */}
          </div>
          <div className="price-input">
            <span>إلى</span>
            <input
              type="number"
              placeholder="9999"
              value={priceTo}
              onChange={onChangePriceTo}
            />
            {/* <span>ج.م</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilter;
