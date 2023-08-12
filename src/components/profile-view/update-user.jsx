import React, { useState } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";


export const UpdateUser = ({ user, token, setUser }) => {

  //useState hooks
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    console.log(user);
    fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
        return response.json();
      } else {
        alert("Update failed");
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }).catch((error) => {
      console.log(error);
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
                <Card.Title>Update info</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      minLength="5"
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
                      minLength="5"
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Password is required
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Birthday
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
}