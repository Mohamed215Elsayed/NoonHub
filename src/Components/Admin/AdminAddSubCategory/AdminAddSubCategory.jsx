import { Row, Col, Form, Spinner } from "react-bootstrap";
import "./AdminAddSubCategory.css";
import AddSubCategoryHook from "../../../Hook/subcategory/add-subcategory-hook";


const AdminAddSubCategory = () => {
  const [
    name,
    onChangeName,
    categories,
    loading,
    id,
    onSelectCategory,
    handleSubmit,
  ] = AddSubCategoryHook();

  return (
    <div className="admin-add-subcategory-wrapper">
      <div className="admin-content-title pb-4">إضافة تصنيف فرعي جديد</div>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-start">
          <Col sm="12" md="8">
            <div className="text-form pb-2">اسم التصنيف الفرعي</div>
            <input
              type="text"
              className="input-form d-block mt-1 px-3 subcategory-name-input"
              placeholder="مثل: هواتف ذكية، أو أجهزة لابتوب"
              value={name}
              onChange={onChangeName}
            />
            <div className="text-form pt-4 pb-2">اختر التصنيف الرئيسي</div>
            <select
              name="parent-category"
              id="parent-category-select"
              className="select-form-control mt-1 px-2"
              value={id}
              onChange={onSelectCategory}
            >
              <option value="0" disabled>
                -- اختر تصنيفاً --
              </option>
              {categories.data
                ? categories.data.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))
                : null}
            </select>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="8" className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="btn-save-subcategory"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "حفظ التصنيف الفرعي"
              )}
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminAddSubCategory;
