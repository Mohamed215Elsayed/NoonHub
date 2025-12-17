import React from "react";
import Slider from "../../Components/Uitily/Silder/Slider";
import HomeCategory from "../../Components/Home/HomeCategory";
import CardProductsContainer from "../../Components/Products/CardProductsContainer";
import DiscountSection from "../../Components/Home/DiscountSection";
import BrandFeatured from "../../Components/Brand/BrandFeatured";
import { Container } from "react-bootstrap";
function HomePage() {
  return (
    <div className="font">
      <Slider />
      <Container className="my-5">
        <HomeCategory />
        <CardProductsContainer
          title="الاكثر مبيعا"
          btntitle="المزيد"
          pathText="/products"
        />
        <DiscountSection />
        <CardProductsContainer
          title="احدث الازياء"
          btntitle="المزيد"
          pathText="/products"
        />

        <BrandFeatured title="أشهر الماركات" btntitle="عرض الكل" />
      </Container>
    </div>
  );
}

export default HomePage;
