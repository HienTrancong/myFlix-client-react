import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {



  return (
    <Card className="h-100">
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card.Img variant="top" src={movie.ImagePath} />
      </Link>
      <Card.Body>
        <Card.Title >{movie.Title}</Card.Title>

        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
      </Card.Body>
    </Card>
  )
};

MovieCard.PropTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  })
}
