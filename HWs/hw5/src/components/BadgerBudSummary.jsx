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

  const firstImg = imgIds?.[0];

  return (
    <Card className="d-flex h-100 p-3">
      <Card.Img
        variant="top"
        src={`${imageAPI}${firstImg}`}
        alt={`A picture of ${name}`}
        style={{ height: "500px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text></Card.Text>
        <div className="d-flex justify-content-around">
          <Button variant="primary">Show More</Button>
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
