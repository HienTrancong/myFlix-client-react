import { useState, useEffect } from "react";

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "./movie-view.scss";

import { CardGroup, Card, Button, Container, CardImg, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = movies.find((m) => m._id === movieId)

  //hooks to take favorited movies
  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId);
    setIsFavorite(isFavorited)
  }, []);

  const addFavorite = () => {
    fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(true);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const removeFavorite = () => {
    fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      }
    }).then((data) => {
      setIsFavorite(false);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className="mt-1 mb-1 h-10 bg-secondary text-white">
              <CardImg variant="top"
                src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <ListGroup>
                  <ListGroupItem>Description: {movie.Description}</ListGroupItem>
                  <ListGroupItem>Director: {movie.Director.Name}</ListGroupItem>
                </ListGroup>

              </Card.Body>
              {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
              ) : (
                <Button onClick={addFavorite}>Add to favorites</Button>
              )

              }
              <Link to={`/`}>
                <Button className="back-button">Back</Button>
              </Link>
            </Card>

          </CardGroup>
        </Col>
      </Row>
    </Container >
  )
};