/*===========first solution===========*/
// import { Row, Col, Form } from "react-bootstrap";
// import Select from "react-select";
// import addIcon from "../../../Assets/Images/add.png";
// import MultiImageInput from "react-multiple-image-input";
// import { CompactPicker } from "react-color";
// import { useParams } from "react-router-dom";
// import AdminEditProductHook from "../../../Hook/admin/edit-product-hook";
// import "../AdminAddProducts/AdminAddProducts.css";
// const AdminEditProducts = () => {
//   const { id } = useParams();
//   const {
//     theme,
//     crop,
//     images,
//     setImages,
//     prodName,
//     onNameChange,
//     prodDescription,
//     onDescChange,
//     priceBefore,
//     onPriceBeforeChange,
//     priceAfterDiscount,
//     onPriceAfterDiscountChange,
//     qty,
//     onQuantityChange,
//     category,
//     catID,
//     onSelectCategory,
//     brand,
//     brandID,
//     onSelectBrand,
//     showColorPickerList,
//     colorToggler,
//     colors,
//     handleColorChange,
//     colorRemove,
//     options,
//     selectedSubID,
//     onSelectSubCategory,
//     handleSubmit,
//     loadingSub,
//     loadingProducts,
//   } = AdminEditProductHook(id);

//   const spinner = (
//     <div
//       className="spinner-border spinner-border-sm text-light"
//       role="status"
//     ></div>
//   );

//   return (
//     <div className="admin-add-products-wrapper">
//       <div className="admin-content-title pb-4">تعديل المنتج: {prodName}</div>

//       <Form onSubmit={handleSubmit}>
//         <Row className="justify-content-start">
//           <Col sm="12" md="10">
//             <div className="text-form pb-2">صور المنتج</div>
//             <MultiImageInput
//               images={images}
//               setImages={setImages}
//               theme={theme}
//               allowCrop={true}
//               cropConfig={{ crop, ruleOfThirds: true }}
//               max={4}
//             />

//             <input
//               type="text"
//               className="input-form d-block mt-3 px-3"
//               placeholder="اسم المنتج"
//               value={prodName}
//               onChange={onNameChange}
//             />
//             <textarea
//               className="input-form input-form-area p-3 mt-3"
//               rows="4"
//               placeholder="الوصف"
//               value={prodDescription}
//               onChange={onDescChange}
//             />
//             <input
//               type="number"
//               className="input-form d-block mt-3 px-3"
//               placeholder="السعر قبل الخصم"
//               value={priceBefore}
//               onChange={onPriceBeforeChange}
//             />
//             <input
//               type="number"
//               className="input-form d-block mt-3 px-3"
//               placeholder="السعر النهائي"
//               value={priceAfterDiscount}
//               onChange={onPriceAfterDiscountChange}
//             />
//             <input
//               type="number"
//               className="input-form d-block mt-3 px-3"
//               placeholder="الكمية"
//               value={qty}
//               onChange={onQuantityChange}
//             />

//             <div className="text-form pt-4 pb-2">التصنيف الرئيسي</div>
//             <select
//               name="category"
//               className="select-form-control mt-1 px-2 select-product-category"
//               value={catID}
//               onChange={onSelectCategory}
//             >
//               <option value="0">-- اختر تصنيفاً --</option>
//               {category?.data?.map((item) => (
//                 <option key={item._id} value={item._id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <div className="text-form pt-4 pb-2">التصنيفات الفرعية</div>
//             <Select
//               isMulti
//               isRtl={true}
//               className="react-select-container mt-1"
//               options={options}
//               value={selectedSubID}
//               onChange={onSelectSubCategory}
//               placeholder="اختر تصنيفات فرعية"
//               noOptionsMessage={() =>
//                 loadingSub ? "جاري التحميل..." : "لا توجد نتائج"
//               }
//             />

//             <div className="text-form pt-4 pb-2">الماركة</div>
//             <select
//               name="brand"
//               className="select-form-control mt-1 px-2 select-product-brand"
//               value={brandID}
//               onChange={onSelectBrand}
//             >
//               <option value="0">-- اختر ماركة --</option>
//               {brand?.data?.map((item) => (
//                 <option key={item._id} value={item._id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>

//             <div className="text-form mt-4 pb-2">الألوان المتاحة للمنتج</div>
//             <div className="mt-1 d-flex product-colors-list">
//               {colors.map((color, index) => (
//                 <div
//                   key={index}
//                   onClick={() => colorRemove(color)}
//                   className={`color-swatch me-2 ${
//                     color === "#FFFFFF" ? "border-light" : "border-dark"
//                   }`}
//                   style={{ backgroundColor: color }}
//                   title="اضغط للحذف"
//                 />
//               ))}
//               <img
//                 onClick={colorToggler}
//                 src={addIcon}
//                 alt="Add"
//                 width="30px"
//                 height="30px"
//                 className="add-color-icon"
//                 style={{ cursor: "pointer" }}
//               />
//               {showColorPickerList && (
//                 <div className="color-picker-wrapper">
//                   <CompactPicker onChangeComplete={handleColorChange} />
//                 </div>
//               )}
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col sm="12" md="10" className="d-flex justify-content-end mt-4">
//             <button
//               type="submit"
//               className="btn-save-product"
//               disabled={loadingProducts}
//             >
//               {loadingProducts ? spinner : "حفظ التعديلات"}
//             </button>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// };

// export default AdminEditProducts;
/*===========second solution===========*/
// import { Row, Col, Form } from "react-bootstrap";
// import Select from "react-select";
// import addIcon from "../../../Assets/Images/add.png";
// import MultiImageInput from "react-multiple-image-input";
// import { CompactPicker } from "react-color";
// import { useParams } from "react-router-dom";
// import AdminEditProductHook from "../../../Hook/admin/edit-product-hook";
// import "./AdminEditProducts.css";

// const AdminEditProducts = () => {
//   const { id } = useParams();

//   const {
//     form,
//     handleChange,
//     theme,
//     crop,
//     images,
//     setImages,
//     options,
//     handleSubmit,
//     categories,
//     brands,
//     loadingSub,
//     loadingProducts,
//     showColorPickerList,
//     colorToggler,
//     colors,
//     handleColorChange,
//     colorRemove,
//   } = AdminEditProductHook(id);

//   const spinner = (
//     <div
//       className="spinner-border spinner-border-sm text-light"
//       role="status"
//     ></div>
//   );

//   return (
//     <div className="admin-add-products-wrapper">
//       <div className="admin-content-title pb-4">تعديل المنتج: {form.title}</div>

//       <Form onSubmit={handleSubmit}>
//         <Row className="justify-content-start">
//           <Col sm="12" md="10">
//             <div className="text-form pb-2">صور المنتج</div>
//             <MultiImageInput
//               images={images}
//               setImages={setImages}
//               theme={theme}
//               allowCrop
//               cropConfig={{ crop, ruleOfThirds: true }}
//               max={4}
//             />

//             <input
//               type="text"
//               className="input-form d-block mt-3 px-3"
//               placeholder="اسم المنتج"
//               value={form.title}
//               onChange={(e) => handleChange("title", e.target.value)}
//             />

//             <textarea
//               className="input-form input-form-area p-3 mt-3"
//               rows="4"
//               placeholder="الوصف"
//               value={form.description}
//               onChange={(e) => handleChange("description", e.target.value)}
//             />

//             <input
//               type="number"
//               className="input-form d-block mt-3 px-3"
//               placeholder="السعر قبل الخصم"
//               value={form.price}
//               onChange={(e) => handleChange("price", Number(e.target.value))}
//             />

//             <input
//               type="number"
//               className="input-form d-block mt-3 px-3"
//               placeholder="السعر النهائي"
//               value={form.priceAfterDiscount}
//               onChange={(e) =>
//                 handleChange("priceAfterDiscount", Number(e.target.value))
//               }
//             />

//             <input
//               type="number"
//               className="input-form d-block mt-3 px-3"
//               placeholder="الكمية"
//               value={form.quantity}
//               onChange={(e) => handleChange("quantity", Number(e.target.value))}
//             />

//             <div className="text-form pt-4 pb-2">التصنيف الرئيسي</div>
//             <select
//               name="category"
//               className="select-form-control mt-1 px-2 select-product-category"
//               value={form.category}
//               onChange={(e) => handleChange("category", e.target.value)}
//             >
//               <option value="0">-- اختر تصنيفاً --</option>

//               {categories?.data?.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>

//             <div className="text-form pt-4 pb-2">التصنيفات الفرعية</div>
//             <Select
//               isMulti
//               isRtl
//               className="react-select-container mt-1"
//               options={options}
//               value={form.subcategories}
//               onChange={(val) => handleChange("subcategories", val)}
//               placeholder="اختر تصنيفات فرعية"
//               noOptionsMessage={() =>
//                 loadingSub ? "جاري التحميل..." : "لا توجد نتائج"
//               }
//             />

//             <div className="text-form pt-4 pb-2">الماركة</div>
//             <select
//               name="brand"
//               className="select-form-control mt-1 px-2 select-product-brand"
//               value={form.brand}
//               onChange={(e) => handleChange("brand", e.target.value)}
//             >
//               <option value="0">-- اختر ماركة --</option>
//               {brands?.data?.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.name}
//                 </option>
//               ))}
//             </select>

//             <div className="text-form mt-4 pb-2">الألوان المتاحة للمنتج</div>
//             <div className="mt-1 d-flex product-colors-list">
//               {colors?.map((color, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => colorRemove(color)}
//                   className={`color-swatch me-2 ${
//                     color === "#FFFFFF" ? "border-light" : "border-dark"
//                   }`}
//                   style={{ backgroundColor: color }}
//                   title="اضغط للحذف"
//                 />
//               ))}
//               <img
//                 onClick={colorToggler}
//                 src={addIcon}
//                 alt="Add"
//                 width="30px"
//                 height="30px"
//                 className="add-color-icon"
//                 style={{ cursor: "pointer" }}
//               />
//               {showColorPickerList && (
//                 <div className="color-picker-wrapper">
//                   <CompactPicker onChangeComplete={handleColorChange} />
//                 </div>
//               )}
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col sm="12" md="10" className="d-flex justify-content-end mt-4">
//             <button
//               type="submit"
//               className="btn-save-product"
//               disabled={loadingProducts}
//             >
//               {loadingProducts ? spinner : "حفظ التعديلات"}
//             </button>
//           </Col>
//         </Row>
//       </Form>
//     </div>
//   );
// };
// export default AdminEditProducts;
/*===========third solution===========*/
import "../AdminAddProducts/AdminAddProducts.css";
import { Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { Controller } from "react-hook-form";
import MultiImageInput from "react-multiple-image-input";
import { CompactPicker } from "react-color";
import addIcon from "../../../Assets/Images/add.png";
import AdminEditProductHook from "./../../../Hook/admin/edit-product-hook";
import { useParams } from "react-router-dom";
const AdminEditProducts = () => {
  const { id } = useParams();
  const {
    register,
    onSubmit,
    errors,
    control,
    images,
    setImages,
    category,
    brand,
    options,
    loading,
    loadingSub,
    showColor,
    colorToggler,
    colors,
    colorRemove,
    handleColorChange,
    item,
  } = AdminEditProductHook(id);

  const cropConfig = {
    crop: {
      unit: "%",
      aspect: 4 / 3,
      width: 80,
      height: 80,
      x: 10,
      y: 10,
    },
    ruleOfThirds: true,
  };

  const theme = {
    background: "#ffffff",
    outlineColor: "#e5e7eb",
    textColor: "#374151",
    buttonColor: "#ff0e1f",
    modalColor: "#ffffff",
  };

  return (
    <div className="admin-add-products-wrapper">
      <div className="admin-content-title pb-4">
        تعديل المنتج:
        <span style={{ color: "#915970" }}>{item?.data?.title}</span>
      </div>

      <Form onSubmit={onSubmit} style={{ opacity: loading ? 0.6 : 1 }}>
        <Row className="justify-content-start">
          <Col sm="12" md="10">
            <div className="text-form pb-2 product-images-label">
              صور المنتج
            </div>

            <MultiImageInput
              images={images}
              setImages={setImages}
              theme={theme}
              allowCrop={true}
              cropConfig={cropConfig}
              max={4}
              handleError={(err) => console.log(err)}
            />

            <input
              {...register("prodName")}
              type="text"
              className={`input-form d-block mt-3 px-3 product-name-input ${
                errors.prodName ? "is-invalid" : ""
              }`}
              placeholder="اسم المنتج"
            />
            {errors.prodName && (
              <span className="text-danger d-block mt-1">
                {errors.prodName.message}
              </span>
            )}

            <textarea
              {...register("prodDescription")}
              className={`input-form input-form-area p-3 mt-3 product-description ${
                errors.prodDescription ? "is-invalid" : ""
              }`}
              rows="4"
              placeholder="وصف المنتج بالتفصيل"
            />
            {errors.prodDescription && (
              <span className="text-danger d-block mt-1">
                {errors.prodDescription.message}
              </span>
            )}

            <input
              {...register("priceBefore")}
              type="number"
              className={`input-form d-block mt-3 px-3 ${
                errors.priceBefore ? "is-invalid" : ""
              }`}
              placeholder="السعر قبل الخصم (اختياري)"
            />
            {errors.priceBefore && (
              <span className="text-danger d-block mt-1">
                {errors.priceBefore.message}
              </span>
            )}

            <input
              {...register("priceAfterDiscount")}
              type="number"
              className={`input-form d-block mt-3 px-3 product-price-input ${
                errors.priceAfterDiscount ? "is-invalid" : ""
              }`}
              placeholder="سعر المنتج النهائي"
            />
            {errors.priceAfterDiscount && (
              <span className="text-danger d-block mt-1">
                {errors.priceAfterDiscount.message}
              </span>
            )}

            <input
              {...register("qty")}
              type="number"
              className={`input-form d-block mt-3 px-3 ${
                errors.qty ? "is-invalid" : ""
              }`}
              placeholder="الكمية"
            />
            {errors.qty && (
              <span className="text-danger d-block mt-1">
                {errors.qty.message}
              </span>
            )}

            <div className="text-form pt-4 pb-2">التصنيف الرئيسي</div>
            <select
              {...register("catID")}
              id="category-select"
              className={`select-form-control mt-1 px-2 select-product-category ${
                errors.catID ? "is-invalid" : ""
              }`}
            >
              <option value="0">-- اختر تصنيفاً رئيسياً --</option>
              {category?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.catID && (
              <span className="text-danger d-block mt-1">
                {errors.catID.message}
              </span>
            )}

            <div className="text-form pt-4 pb-2">التصنيفات الفرعية</div>
            <Controller
              name="selectedSubID"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  isRtl={true}
                  placeholder="اختر تصنيفاً فرعياً أو أكثر"
                  options={options}
                  className="react-select-container mt-1"
                  classNamePrefix="react-select"
                  noOptionsMessage={() =>
                    loadingSub ? "جاري التحميل..." : "لا توجد تصنيفات فرعية"
                  }
                />
              )}
            />

            <div className="text-form pt-4 pb-2">الماركة (Brand)</div>
            <select
              {...register("brandID")}
              id="brand-select"
              className="select-form-control mt-1 px-2 select-product-brand"
            >
              <option value="0">-- اختر ماركة --</option>
              {brand?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <div className="text-form mt-4 pb-2">الألوان المتاحة للمنتج</div>
            <div className="mt-1 d-flex product-colors-list">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => colorRemove(color)}
                  className={`color-swatch me-2 ${
                    color === "#FFFFFF" ? "border-light" : "border-dark"
                  }`}
                  style={{ backgroundColor: color }}
                  title="اضغط للحذف"
                />
              ))}

              <img
                onClick={colorToggler}
                src={addIcon}
                alt="Add Color"
                width="30px"
                height="30px"
                className="add-color-icon"
              />
              {showColor && (
                <div className="color-picker-wrapper">
                  <CompactPicker onChangeComplete={handleColorChange} />
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="10" className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="btn-save-product"
              disabled={loading}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "حفظ التعديلات"
              )}
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AdminEditProducts;
