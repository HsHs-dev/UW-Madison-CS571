import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
  const [students, setStudentsData] = useState([]);
  const [studentsNum, setStudentsNum] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw4/students", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        setStudentsData(data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <h1>Badger Book</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control id="searchName" />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control id="searchMajor" />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control id="searchInterest" />
        <br />
        <Button variant="neutral">Reset Search</Button>
      </Form>
      {students.length === 0 ? (
        <p>Fetching Students..</p>
      ) : (
        <p>There are {students.length} student(s) matching your search.</p>
      )}
      <Container fluid>
        <Row className="g-0">
          {students.map((student) => (
            <Col key={student.id} xs={12} md={6} lg={4} xl={3}>
              <Student {...student} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Classroom;
