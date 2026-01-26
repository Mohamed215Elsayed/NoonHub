import { useEffect } from "react";

const useNavbarScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".main-navbar");
      if (!navbar) return;

      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export default useNavbarScroll;
