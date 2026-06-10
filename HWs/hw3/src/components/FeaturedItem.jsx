import { useState } from "react";
import { Card, Button, Table } from "react-bootstrap";

export default function FeaturedItem({
  name,
  price,
  description,
  img,
  nutrition,
}) {
  const [pressed, setPressed] = useState(false);

  function handleButton() {
    setPressed(!pressed);
  }

  return (
    <Card style={{ maxWidth: "24rem", margin: "auto" }} className="shadow-sm">
      <Card.Img variant="top" src={img} alt={name} />

      <Card.Body>
        <Card.Title className="fw-bold">{name}</Card.Title>

        <Card.Text className="fw-semibold text-success">
          ${price} per unit
        </Card.Text>

        <Card.Text>{description}</Card.Text>

        {pressed && (
          <div className="border rounded overflow-hidden mt-3">
            <Table striped hover size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>Calories</th>
                  <th>Fat</th>
                  <th>Carbohydrates</th>
                  <th>Protein</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{nutrition.calories ?? "0g"}</td>
                  <td>{nutrition.fat ?? "0g"}</td>
                  <td>{nutrition.carbohydrates ?? "0g"}</td>
                  <td>{nutrition.protein ?? "0g"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}

        <Button
          variant={pressed ? "secondary" : "primary"}
          className="mt-3 w-100"
          onClick={() => setPressed(!pressed)}
        >
          {pressed ? "Hide nutrition facts" : "Show nutrition facts"}
        </Button>
      </Card.Body>
    </Card>
  );
}
