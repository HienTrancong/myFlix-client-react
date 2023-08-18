
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
            <Card style={{
              border: 'none',
              borderRadius: '10px',
              padding: '5px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.2s ease-in-out',
            }}>
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
                      className="bg-light"
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
                      minLength="5"
                      className="bg-light"
                    >
                    </Form.Control>

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
                      className="bg-light"
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
                      required
                      className="bg-light"
                    >
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit"
                    style={{
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '10px 20px',

                    }}
                    className="mt-3"
                  >
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