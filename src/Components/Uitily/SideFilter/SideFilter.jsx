import "./SideFilter.css";
const SideFilter = () => {
  return (
    <div className="side-filter">
      {/* الفئة */}
      <div className="filter-section">
        <h3 className="filter-title">الفئة</h3>
        <label className="filter-checkbox">
          <input type="checkbox" defaultChecked />
          <span className="checkmark"></span>
          الكل
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          إلكترونيات
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          ملابس
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          أحذية وشنط
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          أجهزة منزلية
        </label>
      </div>

      {/* الماركة */}
      <div className="filter-section">
        <h3 className="filter-title">الماركة</h3>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          أبل
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          سامسونج
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          شاوميومي
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          هواوي
        </label>
        <label className="filter-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          LG
        </label>
      </div>

      {/* السعر */}
      <div className="filter-section">
        <h3 className="filter-title">السعر</h3>
        <div className="price-range">
          <div className="price-input">
            <span>من</span>
            <input type="number" placeholder="0" />
            <span>ج.م</span>
          </div>
          <div className="price-input">
            <span>إلى</span>
            <input type="number" placeholder="9999" />
            <span>ج.م</span>
          </div>
        </div>
        <button className="apply-price-btn">تطبيق</button>
      </div>
    </div>
  );
};

export default SideFilter;
