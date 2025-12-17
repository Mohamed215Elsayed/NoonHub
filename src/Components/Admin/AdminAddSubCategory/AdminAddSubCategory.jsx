import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import "./AdminAddSubCategory.css";

const AdminAddSubCategory = () => {
  return (
    <div className="admin-add-subcategory-wrapper">
      <div className="admin-content-title pb-4">إضافة تصنيف فرعي جديد</div>
      <Form>
        <Row className="justify-content-start">
          <Col sm="12" md="8">
            <div className="text-form pb-2">اسم التصنيف الفرعي</div>
            <input
              type="text"
              className="input-form d-block mt-1 px-3 subcategory-name-input"
              placeholder="مثل: هواتف ذكية، أو أجهزة لابتوب"
            />
            <div className="text-form pt-4 pb-2">اختر التصنيف الرئيسي</div>
            <select
              name="parent-category"
              id="parent-category-select"
              className="select-form-control mt-1 px-2"
              // يجب إضافة onChange للتحكم في القيمة
            >
              <option value="0" disabled>
                -- اختر تصنيفاً --
              </option>
              <option value="val1">الالكترونيات</option>
              <option value="val2">الأزياء</option>
              <option value="val3">الأدوات المنزلية</option>
              <option value="val4">الكتب</option>
            </select>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="8" className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn-save-subcategory">
              حفظ التصنيف الفرعي
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminAddSubCategory;
