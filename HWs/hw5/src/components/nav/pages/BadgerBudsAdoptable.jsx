import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import BadgerBudSummary from "../../BadgerBudSummary.jsx";

export default function BadgerBudsAdoptable(props) {
  const buds = useContext(BadgerBudsDataContext);

  return (
    <div>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>
      <Container fluid>
        <Row className="g-3">
          {buds.map((bud) => {
            console.log(bud);
            return (
              <Col xs={12} md={6} lg={4} xxl={3} key={bud.id}>
                <BadgerBudSummary {...bud} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
