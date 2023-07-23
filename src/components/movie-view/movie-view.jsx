export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} height={500} />
      </div>
      <div>
        {movie.Title}
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.Director.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  )
};