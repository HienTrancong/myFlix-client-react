//TODO add fave, remove fave button

import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      <Card className="h-100"
        style={{
          border: 'none',
          borderRadius: '10px',
          padding: '5px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease-in-out',
        }}>
        <Card.Img
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
          variant="top" src={movie.ImagePath} />
        <Card.Body className="h-100 d-flex flex-column">
          <Card.Title
            style={{
              fontSize: '18px',
              marginTop: '10px'
            }}>{movie.Title}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
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
