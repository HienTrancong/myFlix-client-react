import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //fetch movies data from API
  useEffect(() => {
    fetch("https://hien-tran-080222.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        // const moviesFromApi = data.map((movie) => {
        //   return {
        //     id: movie._id,
        //     title: movie.Title,
        //     image: movie.ImagePath
        //   }
        // })
      });
    // setMovies(moviesFromApi);
  }, []);

  //if SelectedMovie is not null
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    )
  };



  //if Movie state is empty array
  if (movies.length === 0) {
    return <div> The list is empty!</div>
  }
  //if book state is not empty array
  return (
    <div className="my-flix">
      <div>
        {movies.map((movie => {
          return <MovieCard key={movie._id} movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie)
            }}
          />;
        }))}
      </div>
      <button>Test</button>
    </div>
  );
};