import { Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";

import clothe from "../../Assets/Images/clothe.png";
import cat2 from "../../Assets/Images/cat2.png";
import labtop from "../../Assets/Images/labtop.png";
import sale from "../../Assets/Images/sale.png";
import pic from "../../Assets/Images/pic.png";
import mobile from "../../Assets/Images/mobile.png";

const CategoryContainer = () => {
  const cats = [
    { img: clothe, title: "ملابس" },
    { img: cat2, title: "إكسسوارات" },
    { img: labtop, title: "لاب توب" },
    { img: sale, title: "عروض خاصة" },
    { img: pic, title: "كاميرات" },
    { img: mobile, title: "موبايلات" },
    { img: clothe, title: "أحذية" },
    { img: cat2, title: "ساعات" },
    { img: labtop, title: "أجهزة منزلية" },
    { img: sale, title: "مكياج" },
    { img: pic, title: "ألعاب أطفال" },
    { img: mobile, title: "أثاث منزلي" },
  ];

  return (
    <Container className="cat-page py-5">
      <h2 className="cat-page-title">كل التصنيفات</h2>
      <div className="cat-page-line"></div>

      <Row className="g-4 g-lg-5 justify-content-center">
        {cats.map((c, i) => (
          <CategoryCard key={i} img={c.img} title={c.title} />
        ))}
      </Row>
    </Container>
  );
};

export default CategoryContainer;
