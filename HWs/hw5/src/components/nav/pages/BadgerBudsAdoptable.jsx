import { Container, Row, Col } from "react-bootstrap";
import { useState, useContext } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext.js";
import BadgerBudSummary from "../../BadgerBudSummary.jsx";

export default function BadgerBudsAdoptable(props) {
  const buds = useContext(BadgerBudsDataContext);

  const [savedCatIDs, setSavedCatIDs] = useState(
    JSON.parse(sessionStorage.getItem("savedCatIDs") || "[]"),
  );

  const [adoptedCatIDs, setAdoptedCatIDs] = useState(
    JSON.parse(sessionStorage.getItem("adoptedCatIDs") || "[]"),
  );

  function addBasket(id, name) {
    alert(name + " has been added to your basket");

    const updatedIDs = [...savedCatIDs, id];

    sessionStorage.setItem("savedCatIDs", JSON.stringify(updatedIDs));

    setSavedCatIDs(updatedIDs);
  }

  const adoptableBuds = buds.filter(
    (bud) => !savedCatIDs.includes(bud.id) && !adoptedCatIDs.includes(bud.id),
  );

  return (
    <div>
      <h1>Available Badger Buds</h1>
      <p>The following cats are looking for a loving home! Could you help?</p>
      {adoptableBuds.length === 0 ? (
        <p>No buds are available for adoption!</p>
      ) : null}
      <Container fluid>
        <Row className="g-3">
          {adoptableBuds.map((bud) => {
            return (
              <Col xs={12} md={6} lg={4} xxl={3} key={bud.id}>
                <BadgerBudSummary
                  {...bud}
                  onAction2={addBasket}
                  actionText1="Show More"
                  actionText2={
                    <>
                      <span
                        role="img"
                        aria-label="red heart"
                        className="react-emojis"
                        style={{ lineHeight: "1" }}
                      >
                        ❤️️
                      </span>{" "}
                      Adopt
                    </>
                  }
                  actionVariant="success"
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
