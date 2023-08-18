

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
    <>
      <>
        <Col md={8}
          style={{
            border: 'none',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s ease-in-out',
          }}>
          <div>
            <img
              className="float-start me-3 mb-2"
              src={movie.ImagePath}
              alt="Movie Cover Image"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
            <h2>
              {movie.Title}
            </h2>
            <p>{movie.Description}</p>
            <h4>Genre: {movie.Genre.Name}</h4>

            <p>{movie.Genre.Description}</p>
            <h5> Director: {movie.Director.Name} ({movie.Director.Birth}
              {movie.Director.Death
                ? ` - ${movie.Director.Death}`
                : ''})
            </h5>
            <p>{movie.Director.Bio}</p>
            <Link to={'/'}>
              <Button variant="primary">Back</Button>
            </Link>
            {isFavorite ? (
              <Button variant="danger" className="ms-2" onClick={removeFavorite}>
                Remove from favorites
              </Button>
            ) : (
              <Button variant="success" className="ms-2" onClick={addFavorite}>
                Add to favorites
              </Button>
            )}
          </div>
        </Col>
      </>
    </>
  )
};