const CategoryEmptyState = () => {
  return (
    <div className="w-100 text-center mt-5 py-5 animate__animated animate__fadeIn">
      <div className="mb-4">
        <img
          src="../../Assets/images/empty-category.svg"
          alt="No Categories Found"
          style={{ width: "180px", height: "auto", opacity: 0.7 }}
        />
      </div>
      <h4 style={{ color: "#555", fontWeight: "bold" }}>
        عذراً، لا توجد تصنيفات حالياً
      </h4>
      <p className="text-muted">
        سيتم إضافة أقسام جديدة قريباً، ابقَ على اطلاع!
      </p>
      <button
        className="btn btn-outline-primary mt-3"
        onClick={() => window.location.reload()}
      >
        تحديث الصفحة
      </button>
    </div>
  );
};

export default CategoryEmptyState;
