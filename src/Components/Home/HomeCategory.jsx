// function HomeCategory() {
//   return (
//     <Container>
//       <SubTitle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />
//       <Row className="my-2 d-flex justify-content-between">
//         <CategoryCard title="اجهزة منزلية" img={clothe} background="#F4DBA4" />
//         <CategoryCard title="اجهزة منزلية" img={cat2} background="#F4DBA4" />
//         <CategoryCard title="اجهزة منزلية" img={labtop} background="#0034FF" />
//         <CategoryCard title="اجهزة منزلية" img={sale} background="#F4DBA4" />
//         <CategoryCard title="اجهزة منزلية" img={clothe} background="#FF6262" />
//         <CategoryCard title="اجهزة منزلية" img={pic} background="#F4DBA4" />
//       </Row>
//     </Container>
//   );
// }

import React from "react";
import { Container, Row } from "react-bootstrap";
import SubTitle from "../Uitily/ButtonsTitles/SubTitle";
import CategoryCard from "../Category/CategoryCard";
import clothe from "../../Assets/Images/clothe.png";
import cat2 from "../../Assets/Images/cat2.png";
import labtop from "../../Assets/Images/labtop.png";
import sale from "../../Assets/Images/sale.png";
import pic from "../../Assets/Images/pic.png";
import mobile from "../../Assets/Images/mobile.png";

const HomeCategory = () => {
  return (
    <Container className="my-5">
      <SubTitle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />

      <Row className="justify-content-center g-4 mt-3">
        <CategoryCard img={clothe} title="ملابس" />
        <CategoryCard img={cat2} title="إكسسوارات" />
        <CategoryCard img={labtop} title="لاب توب" />
        <CategoryCard img={sale} title="عروض خاصة" />
        <CategoryCard img={mobile} title="موبايلات" />
        <CategoryCard img={pic} title="كاميرات" />
      </Row>
    </Container>
  );
};

export default HomeCategory;
