import React, { useEffect, useState } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage.jsx";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const loadMessages = () => {
    fetch(
      `https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`,
      {
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(loadMessages, [props, page]);

  const totalPages = 4;

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {/* TODO: Allow an authenticated user to create a post. */}
      <hr />
      {messages.length > 0 ? (
        <>
          <Container fluid>
            <Row>
              {messages.map((msg) => {
                return (
                  <Col xs={12} md={6} lg={4} xxl={3} key={msg.created}>
                    <BadgerMessage
                      created={msg.created}
                      title={msg.title}
                      poster={msg.poster}
                      content={msg.content}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => {
          return (
            <Pagination.Item
              key={i}
              active={page === i + 1}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
}
