import { Container, Row, Col } from 'react-bootstrap';
import CartCheckout from '../../Components/Cart/CartCheckout';
import CartItem from '../../Components/Cart/CartItem';
import './CartPage.css';
import GetAllUserCartHook from '../../Hook/cart/get-all-user-cart-hook';
import CartEmpty from '../../Assets/Images/shopping-bag-full.png';

function CartPage() {
  const { cartItems, totalCartPrice, totalPriceAfterDiscount } =
    GetAllUserCartHook();

  const hasItems = cartItems?.length > 0;

  return (
    <Container className="cart-page-container" style={{ minHeight: '670px' }}>
      <Row>
        <div className="cart-title mt-4">عربة التسوق</div>
      </Row>

      <Row className="justify-content-center">
        {/* <Col xs={12} md={9}> */}
        <Col xs={12} lg={9}>
          {hasItems ? (
            cartItems.map((item) => <CartItem key={item._id} item={item} />)
          ) : (
            <div className="cart-item-body">
              <div className="empty-cart">
                <img loading="lazy" src={CartEmpty} alt="empty cart" />
                <h2>عربة التسوق فارغة</h2>
                <p>ابدأ التسوق وأضف منتجاتك المفضلة</p>
              </div>
            </div>
          )}
        </Col>
        <Col xs={12} lg={3} className="mt-3 mt-lg-0">
          {/* <Col xs={12} md={3}> */}
          <CartCheckout
            totalCartPrice={totalCartPrice}
            totalPriceAfterDiscount={totalPriceAfterDiscount}
            cartItems={cartItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
