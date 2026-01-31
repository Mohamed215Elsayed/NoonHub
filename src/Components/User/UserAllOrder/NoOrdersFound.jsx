import { useNavigate } from 'react-router-dom';
import noOrdersImage from '../../../Assets/Images/NOOrder.jpg';
import './NoOrdersFound.css';

const NoOrdersFound = ({ text }) => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate('/');
  };
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center my-5 py-5"
      style={{ minHeight: '400px', width: '100%' }}
    >
      <img
        src={noOrdersImage}
        alt="No Orders Found"
        style={{
          width: '350px',
          maxWidth: '80%',
          height: 'auto',
          opacity: 0.9,
          marginBottom: '30px',
        }}
      />
      <h4 className="text-muted mt-4" style={{ fontWeight: '600' }}>
        {text || 'لا توجد طلبات مسجلة حالياً'}
      </h4>
      <p className="text-secondary">اطلب منتجاتك الآن لتظهر هنا!</p>
      <button onClick={handleShopNow} className="btn-shop-now">
        ابدأ التسوق الآن
      </button>
    </div>
  );
};

export default NoOrdersFound;
