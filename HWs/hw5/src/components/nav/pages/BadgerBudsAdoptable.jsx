import { Container, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import BadgerBudSummary from "../../BadgerBudSummary.jsx";

export default function BadgerBudsAdoptable(props) {
  const [buds, setBuds] = useState(useContext(BadgerBudsDataContext));

  function addBasket(id, name) {
    alert(name + " has been added to your basket");

    const savedCatIDs = JSON.parse(
      sessionStorage.getItem("savedCatIDs") || "[]",
    );

    if (!savedCatIDs.includes(id)) {
      savedCatIDs.push(id);
      sessionStorage.setItem("savedCatIDs", JSON.stringify(savedCatIDs));
    }

    setBuds((buds) => buds.filter((bud) => bud.id !== id));
  }

  return (
    <div>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>
      <Container fluid>
        <Row className="g-3">
          {buds.map((bud) => {
            return (
              <Col xs={12} md={6} lg={4} xxl={3} key={bud.id}>
                <BadgerBudSummary {...bud} addBasket={addBasket} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
