

import { CardGroup, Card, Button, Container, CardImg, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card >
              <CardImg
                src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <ListGroup>
                  <ListGroupItem>Description: {movie.Description}</ListGroupItem>
                  <ListGroupItem>Director: {movie.Director.Name}</ListGroupItem>
                </ListGroup>
                <Button variant="primary" onClick={onBackClick}>
                  Back
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container >
  )
};