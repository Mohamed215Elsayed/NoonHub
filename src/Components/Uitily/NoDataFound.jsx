import noDataImg from '../../Assets/Images/no-cat.avif';

const NoDataFound = ({ title, description }) => {
  return (
    <div className="text-center py-5 bg-white rounded shadow-sm border border-light">
      <img
        src={noDataImg}
        alt="No Data"
        style={{ width: '180px', marginBottom: '15px', opacity: 0.8 }}
      />

      <h4 className="text-muted font-weight-bold">
        {title || 'لا توجد بيانات متوفرة حالياً'}
      </h4>
      <p className="text-secondary mb-0">
        {description || 'يرجى المحاولة مرة أخرى في وقت لاحق'}
      </p>
    </div>
  );
};

export default NoDataFound;
