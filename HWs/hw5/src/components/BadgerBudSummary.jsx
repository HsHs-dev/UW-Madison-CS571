import { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function BadgerBudSummary({
  id,
  imgIds,
  name,
  age,
  breed,
  gender,
  description,
}) {
  const imageAPI =
    "https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/";

  const [showMore, setShowMore] = useState(false);

  const firstImg = imgIds?.[0];

  function handleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <Card className="d-flex h-100 p-3">
      <Card.Img
        variant="top"
        src={`${imageAPI}${firstImg}`}
        alt={`A picture of ${name}`}
        style={{ height: "500px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{name}</Card.Title>
        {showMore && (
          <Card.Text>
            {gender ?? ""} <br />
            {breed ?? ""} <br />
            {age ?? ""} <br /> <br />
            {description ?? ""}
          </Card.Text>
        )}
        <div className="d-flex justify-content-around mt-3">
          <Button variant="primary" onClick={handleShowMore}>
            {!showMore ? "Show More" : "Show Less"}
          </Button>
          <Button variant="success">
            <span
              role="img"
              aria-label="red heart"
              className="react-emojis"
              style={{ lineHeight: "1" }}
            >
              ❤️️
            </span>{" "}
            Adopt
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
