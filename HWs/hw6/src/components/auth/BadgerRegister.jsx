import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function BadgerRegister() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [passConf, setPassConf] = useState("");

  function handleRegister(e) {
    e?.preventDefault();

    const sevenDigits = /^\d{7}$/;

    if (username.length === 0 || pin.length === 0) {
      alert("You must provide both a username and pin!");
    } else if (!sevenDigits.test(pin) || !sevenDigits.test(passConf)) {
      alert("Your pin must be a 7-digit number!");
    } else if (pin !== passConf) {
      alert("Your pins do not match!");
    } else {
      fetch("https://cs571.org/rest/s25/hw6/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          pin: pin,
        }),
      }).then((res) => {
        if (res.status === 409) {
          alert("That username has already been taken!");
        } else if (res.status === 200) {
          alert("Registration was successful");
        }
      });
    }
  }

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={handleRegister}>
        <Form.Label htmlFor="usernameInput">Username</Form.Label>
        <Form.Control
          id="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Form.Control>
        <Form.Label htmlFor="pinInput">Password</Form.Label>
        <Form.Control
          id="pinInput"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        ></Form.Control>
        <Form.Label htmlFor="pinConfInput">Repeat Password</Form.Label>
        <Form.Control
          id="pinConfInput"
          type="password"
          value={passConf}
          onChange={(e) => setPassConf(e.target.value)}
        ></Form.Control>

        <br />
        <Button type="submit" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </>
  );
}
