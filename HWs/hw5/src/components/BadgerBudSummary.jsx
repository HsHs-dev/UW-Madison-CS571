import { useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";

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

  function handleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <Card className="d-flex h-100 p-3">
      {showMore ? (
        <Carousel>
          {imgIds.map((imgId) => (
            <Carousel.Item key={imgId}>
              <Card.Img
                src={`${imageAPI}${imgId}`}
                alt={`A picture of ${name}`}
                style={{
                  objectFit: "cover",
                  aspectRatio: "1 / 1",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Card.Img
          variant="top"
          src={`${imageAPI}${imgIds?.[0]}`}
          alt={`A picture of ${name}`}
          style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
        />
      )}

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
