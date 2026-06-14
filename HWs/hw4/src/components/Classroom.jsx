import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
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

  const [page, setPage] = useState(1);
  const itemsPerPage = 24;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const displayedStudents = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

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
      <Container fluid className="d-flex flex-column min-vh-100">
        <Row className="g-0">
          {displayedStudents.map((student) => (
            <Col key={student.id} xs={12} md={6} lg={4} xl={3}>
              <Student {...student} />
            </Col>
          ))}
        </Row>
      </Container>
      <Pagination className="mt-5 mb-5">
        <Pagination.Prev onClick={() => setPage(page === 1 ? page : page - 1)}>
          Previous
        </Pagination.Prev>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <Pagination.Item
              key={pageNum}
              active={page === pageNum}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          onClick={() => setPage(page === totalPages ? totalPages : page + 1)}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default Classroom;
