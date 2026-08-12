import BadgerBudSummary from "../../BadgerBudSummary.jsx";
import { useState, useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import { Container, Row, Col } from "react-bootstrap";

export default function BadgerBudsBasket(props) {
  const buds = useContext(BadgerBudsDataContext);

  const [savedCatIDs, setSavedCatIDs] = useState(
    JSON.parse(sessionStorage.getItem("savedCatIDs") || "[]"),
  );

  const [adoptedCatIDs, setAdoptedCatIDs] = useState(
    JSON.parse(sessionStorage.getItem("adoptedCatIDs") || "[]"),
  );

  function removeID(id) {
    const updatedIDs = savedCatIDs.filter((curr) => curr !== id);

    sessionStorage.setItem("savedCatIDs", JSON.stringify(updatedIDs));
    setSavedCatIDs(updatedIDs);
  }

  function unselectCat(id, name) {
    alert(name + " has been removed from your basket");
    removeID(id);
  }

  function adoptCat(id, name) {
    alert(name + " has been adopted!");
    removeID(id);
    const updatedAdopted = [...adoptedCatIDs, id];
    sessionStorage.setItem("adoptedCatIDs", JSON.stringify(updatedAdopted));
    setAdoptedCatIDs(updatedAdopted);
  }

  const basketBuds = buds.filter((bud) => savedCatIDs.includes(bud.id));

  return (
    <div>
      <h1>Badger Buds Basket</h1>
      <p>These cute cats could be all yours!</p>
      <Container fluid>
        <Row className="g-3">
          {basketBuds.map((bud) => {
            return (
              <Col xs={12} md={6} lg={4} xxl={3} key={bud.id}>
                <BadgerBudSummary
                  {...bud}
                  onAction1={unselectCat}
                  onAction2={adoptCat}
                  actionText1="Unselect"
                  actionText2="💕 Save"
                  actionVariant="success"
                  actionVariant1="secondary"
                  actionVariant2="success"
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
