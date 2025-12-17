import { Container, Row, Col } from "react-bootstrap";
import UserSideBar from "../../Components/User/UserSideBar/UserSideBar";
import UserAllAddres from "../../Components/User/UserAddress/UserAllAddres";

function UserAllAddresPage() {
  return (
    
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <UserSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <UserAllAddres />
        </Col>
      </Row>
    </Container>
  );
}

export default UserAllAddresPage;

