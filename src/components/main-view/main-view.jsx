import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

  const [movies, setMovies] = useState([]);


  //fetch movies data from API
  useEffect(() => {
    fetch("https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Director: movie.Director,
            Genre: movie.Genre
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  //if SelectedMovie is not null
  if (selectedMovie) {
    return (
      <div>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)} />
      </div>
    );
  }



  //if Movie state is empty array
  if (movies.length === 0) {
    return <div> The list is empty!</div>
  }
  //if Movie state is not empty array
  return (
    <div className="my-flix">
      <div>
        {movies.map((movie) =>
          < MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie)
            }}
          />)
        }
      </div>
    </div>
  );
};