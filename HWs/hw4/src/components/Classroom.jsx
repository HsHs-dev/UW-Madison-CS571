import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
  const [students, setStudentsData] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputInterest, setInputInterest] = useState("");

  const filteredStudents = students.filter((student) => {
    const name = `${student.name.first} ${student.name.last}`.toLowerCase();
    const major = student.major.toLowerCase();
    const searchName = inputName.toLowerCase().trim();
    const searchMajor = inputMajor.toLowerCase().trim();
    const searchInterest = inputInterest.toLowerCase().trim();

    return (
      name.includes(searchName) &&
      major.includes(searchMajor) &&
      student.interests.some((inter) =>
        inter.toLowerCase().includes(searchInterest),
      )
    );
  });

  const handlReset = () => {
    setInputName("");
    setInputMajor("");
    setInputInterest("");
  };

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
        <Form.Control
          id="searchName"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={inputMajor}
          onChange={(e) => setInputMajor(e.target.value)}
          className="mt-3 mb-3"
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={inputInterest}
          onChange={(e) => setInputInterest(e.target.value)}
        />
        <br />
        <Button variant="secondary mb-2" onClick={handlReset}>
          Reset Search
        </Button>
      </Form>
      {students.length === 0 ? (
        <p>Fetching Students..</p>
      ) : (
        <p>
          There are {filteredStudents.length} student(s) matching your search.
        </p>
      )}
      <Container fluid>
        <Row className="g-0">
          {filteredStudents.map((student) => (
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
