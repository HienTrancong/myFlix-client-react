import PropTypes from 'prop-types';


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => { onMovieClick(movie) }
      }
    >
      {movie.Title}
    </div >
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
