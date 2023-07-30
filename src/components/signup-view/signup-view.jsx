import { useState } from "react";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
export const SignupView = () => {

  //useState hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    fetch("https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    })
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please register</Card.Title>

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
                      minLength="5"
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Username should be more than 5 characters.
                    </Form.Text>
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
                      minLength="5"
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Password should be more than 5 characters.
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
                      required
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Birthday
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    >
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Signup
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}