import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import avatarPlaceholder from "../../../Assets/Images/avatar.png";
import addIcon from "../../../Assets/Images/add.png";
import "./AdminAddProducts.css";

const AdminAddProducts = () => {
  const options = [
    { label: "هواتف ذكية", value: 1 },
    { label: "أجهزة لوحية", value: 2 },
    { label: "إكسسوارات", value: 3 },
  ];

  const handleChangeSubCategory = (selectedOptions) => {
    console.log("Subcategories selected:", selectedOptions);
  };

  const availableColors = [
    { id: 1, code: "#E52C2C" },
    { id: 2, code: "#FFFFFF" },
    { id: 3, code: "#000000" },
  ];

  return (
    <div className="admin-add-products-wrapper">
      <div className="admin-content-title pb-4">إضافة منتج جديد</div>

      <Form>
        <Row className="justify-content-start">
          <Col sm="12" md="10">
            <div className="text-form pb-2 product-images-label">
              صور المنتج
            </div>
            <div className="product-images-container">
              <label htmlFor="upload-image-input" className="image-upload-area">
                <img
                  src={avatarPlaceholder}
                  alt="Product Preview"
                  className="product-preview-image"
                />
                <input
                  type="file"
                  name="photo"
                  id="upload-image-input"
                  accept="image/*"
                />
              </label>
            </div>

            <input
              type="text"
              className="input-form d-block mt-3 px-3 product-name-input"
              placeholder="اسم المنتج"
            />

            <textarea
              className="input-form input-form-area p-3 mt-3 product-description"
              rows="4"
              placeholder="وصف المنتج بالتفصيل"
            />

            <input
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="السعر قبل الخصم (اختياري)"
            />
            <input
              type="number"
              className="input-form d-block mt-3 px-3 product-price-input"
              placeholder="سعر المنتج النهائي"
            />

            <div className="text-form pt-4 pb-2">التصنيف الرئيسي</div>
            <select
              name="category"
              id="category-select"
              className="select-form-control mt-1 px-2 select-product-category"
            >
              <option value="0" disabled>
                -- اختر تصنيفاً رئيسياً --
              </option>
              <option value="val1">الالكترونيات</option>
              <option value="val2">الأزياء</option>
            </select>

            <div className="text-form pt-4 pb-2">التصنيفات الفرعية</div>
            <Select
              isMulti
              isRtl={true}
              placeholder="اختر تصنيفاً فرعياً أو أكثر"
              options={options}
              onChange={handleChangeSubCategory}
              className="react-select-container mt-1"
              classNamePrefix="react-select"
            />

            <div className="text-form pt-4 pb-2">الماركة (Brand)</div>
            <select
              name="brand"
              id="brand-select"
              className="select-form-control mt-1 px-2 select-product-brand"
            >
              <option value="0" disabled>
                -- اختر ماركة --
              </option>
              <option value="val1">ابل (Apple)</option>
              <option value="val2">سامسونج (Samsung)</option>
            </select>

            <div className="text-form mt-4 pb-2">الألوان المتاحة للمنتج</div>
            <div className="mt-1 d-flex product-colors-list">
              {availableColors.map((color) => (
                <div
                  key={color.id}
                  className={`color-swatch me-2 ${
                    color.code === "#FFFFFF" ? "border-light" : "border-dark"
                  }`}
                  style={{ backgroundColor: color.code }}
                ></div>
              ))}

              <img
                src={addIcon}
                alt="Add Color"
                width="30px"
                height="30px"
                className="add-color-icon"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="10" className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn-save-product">
              حفظ المنتج
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminAddProducts;
