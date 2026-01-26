import { Row, Col, Form, Spinner } from 'react-bootstrap';
import '../AdminEditBrand/AdminEditBrand.css'; 
import EditCategoryHook from '../../../Hook/Category/EditCategoryHook'; 

const AdminEditCategory = () => {
  const [name, onChangeName, img, onImageChange, loading, handleSubmit] =
    EditCategoryHook();

  return (
    <div className="admin-add-brand-wrapper">
      <div className="admin-content-title pb-4">تعديل التصنيف</div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="12" md="8">
            {img && (
              <label className="image-upload-area">
                <img
                  src={img}
                  alt="Category Preview"
                  className="brand-preview-image"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  id="upload-image-input"
                />
              </label>
            )}

            <input
              type="text"
              className="input-form d-block mt-4 px-3"
              value={name}
              onChange={onChangeName}
              placeholder="اسم التصنيف"
            />
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="8" className="d-flex justify-content-end mt-4">
            <button className="btn-save-brand" disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'حفظ التعديلات'}
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminEditCategory;
