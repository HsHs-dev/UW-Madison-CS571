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
  onAction1,
  onAction2,
  actionText1,
  actionText2,
  actionVariant1 = "primary",
  actionVariant2 = "secondary",
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
          <Button
            variant={actionVariant1}
            onClick={() => (onAction1 ? onAction1(id, name) : handleShowMore())}
          >
            {actionText1 === "Show More"
              ? showMore
                ? "Show Less"
                : "Show More"
              : actionText1}
          </Button>
          <Button variant={actionVariant2} onClick={() => onAction2(id, name)}>
            {actionText2}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
