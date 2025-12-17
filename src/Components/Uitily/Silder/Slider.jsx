// import React, { useState } from "react";
// import { Carousel } from "react-bootstrap";
// import slide1 from "../../../Assets/Images/slider1.png";
// import slide2 from "../../../Assets/Images/prod4.png";
// import slide3 from "../../../Assets/Images/prod3.png";
// import slide4 from "../../../Assets/Images/slider4.png";
// import "./Slider.css";

// function Slider() {
//   const [index, setIndex] = useState(0);
//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };
//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect}>
//       <Carousel.Item className="slider-background1" interval={2000}>
//         <div className="d-flex flex-row justify-content-center align-items-center ">
//           <img
//             style={{ height: "296px", width: "313.53px" }}
//             className=""
//             src={slide4}
//             alt="First slide"
//           />
//           <div className="">
//             <h3 className="slider-title">هناك خصم كبير</h3>
//             <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
//           </div>
//         </div>
//       </Carousel.Item>
//       <Carousel.Item className="slider-background2" interval={2000}>
//         <div className="d-flex flex-row justify-content-center align-items-center">
//           <img
//             style={{ height: "296px", width: "313.53px" }}
//             className=""
//             src={slide1}
//             alt="First slide"
//           />
//           <div className="">
//             <h3 className="slider-title">هناك خصم كبير</h3>
//             <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
//           </div>
//         </div>
//       </Carousel.Item>

//       <Carousel.Item className="slider-background3" interval={2000}>
//         <div className="d-flex flex-row justify-content-center align-items-center">
//           <img
//             style={{ height: "296px", width: "373.53px" }}
//             className=""
//             src={slide3}
//             alt="First slide"
//           />
//           <div className="">
//             <h3 className="slider-title">هناك خصم كبير</h3>
//             <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
//           </div>
//         </div>
//       </Carousel.Item>

//       <Carousel.Item className="slider-background4" interval={2000}>
//         <div className="d-flex flex-row justify-content-center align-items-center">
//           <img
//             style={{ height: "296px", width: "373.53px" }}
//             className=""
//             src={slide2}
//             alt="First slide"
//           />
//           <div className="">
//             <h3 className="slider-title">هناك خصم كبير</h3>
//             <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
//           </div>
//         </div>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default Slider;

// ملف: HeroSlider.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import "./Slider.css";

// استورد الصور بتاعتك (غيّر المسارات حسب عندك)
//  import hero1 from "../../../Assets/Images/slider1.png";
// import hero2 from "../../../Assets/Images/prod4.png";
// import hero3 from "../../../Assets/Images/prod3.png";
// import slide4 from "../../../Assets/Images/slider4.png";
// import hero1 from "../../../Assets/Images/hero1.jpg";
// import hero2 from "../../../Assets/Images/hero2.jpg";
// import hero3 from "../../../Assets/Images/hero3.jpg";

const HeroSlider = () => {
  return (
    <Carousel 
      controls={true} 
      indicators={false} 
      pause="hover" 
      interval={2000}
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
            <a href="/#" className="hero-btn">
              تسوق الآن
            </a>
          </div>
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
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
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <div className="hero-slide slide-3">
          <div className="hero-content">
            <p className="hero-badge">جديد وصل</p>
            <h1 className="hero-title">
              تشكيلة الشتاء <span className="highlight">2025</span>
            </h1>
            <p className="hero-subtitle">أحدث الموديلات بأسعار تبدأ من 299 جنيه</p>
            <a href="/#" className="hero-btn">
              اكتشف المجموعة
            </a>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSlider;