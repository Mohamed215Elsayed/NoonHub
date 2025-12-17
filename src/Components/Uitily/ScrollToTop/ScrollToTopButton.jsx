import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // كليك يمين أو ضغط مطول على الموبايل = نزول تحت
  const handleContext = (e) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      onContextMenu={handleContext}
      className={`scroll-btn ${isVisible ? "show" : ""}`}
      aria-label="الرجوع إلى الأعلى"
      title="كليك عادي = فوق | كليك يمين = تحت"
    >
      <FaArrowUp className="icon-up" />
      <FaArrowDown className="icon-down" />
    </button>
  );
};

export default ScrollToTopButton;