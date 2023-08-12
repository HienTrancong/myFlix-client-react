import { useState } from "react";
import { Container, Row, Col, Card, CardGroup, Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(), console.log(data))
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedin(data.user, data.token);
        } else {
          alert("No such user here");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    >
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    >
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};