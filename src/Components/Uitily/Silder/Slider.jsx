import { Carousel } from 'react-bootstrap';
import './Slider.css';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  return (
    <Carousel
      controls={true}
      indicators={true}
      pause="hover"
      interval={4000}
      className="hero-carousel"
    >
      {/* Slide 1 */}
      <Carousel.Item>
        <div className="hero-slide slide-1">
          <div className="hero-content">
            <p className="hero-badge">عرض اليوم فقط</p>
            <h1 className="hero-title">
              خصم يصل إلى <span className="highlight">٧٠٪</span>
            </h1>
            <p className="hero-subtitle">على كل المنتجات المختارة</p>

            <Link to="/products" className="hero-btn">
              تسوق العروض
            </Link>
          </div>
        </div>
      </Carousel.Item>
    {/* Slide 2 */}
      <Carousel.Item>
        <div className="hero-slide slide-2">
          <div className="hero-content">
            <p className="hero-badge">وصل حديثاً</p>
            <h1 className="hero-title">
              أحدث صيحات <span className="highlight">الموضة</span>
            </h1>
            <p className="hero-subtitle">اكتشف تشكيلة شتاء 2026 الحصرية</p>
            <Link to="/allcategory" className="hero-btn">
              تصفح الأقسام
            </Link>
          </div>
        </div>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <div className="hero-slide slide-3">
          <div className="hero-content">
            <p className="hero-badge">ماركات عالمية</p>
            <h1 className="hero-title">
              أفضل الماركات <span className="highlight">الأصلية</span>
            </h1>
            <p className="hero-subtitle">
              ضمان عام كامل على كافة الأجهزة الإلكترونية
            </p>
            <Link to="/allbrand" className="hero-btn">
              كل الماركات
            </Link>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSlider;
{
  /* Slide 2 */
}
{
  /* <Carousel.Item>
        <div className="hero-slide slide-2">
          <div className="hero-content">
            <p className="hero-badge">شحن مجاني</p>
            <h1 className="hero-title">
              لكل الطلبات فوق <span className="highlight">٩٩٩</span> جنيه
            </h1>
            <p className="hero-subtitle">في نفس اليوم داخل القاهرة والجيزة</p>
            <a href="/#" className="hero-btn">
              اطلب دلوقتي
            </a>
          </div>
        </div>
      </Carousel.Item> */
}
{
  /* <Carousel.Item>
        <div className="hero-slide slide-3">
          <div className="hero-content">
            <p className="hero-badge">جديد وصل</p>
            <h1 className="hero-title">
              تشكيلة الشتاء <span className="highlight">2026</span>
            </h1>
            <p className="hero-subtitle">
              أحدث الموديلات بأسعار تبدأ من 299 جنيه
            </p>
            <a href="/#" className="hero-btn">
              اكتشف المجموعة
            </a>
          </div>
        </div>
      </Carousel.Item> */
}
