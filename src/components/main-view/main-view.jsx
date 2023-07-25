import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  //localStorage loggined user
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  //useState hooks
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  //fetch movies data from API
  useEffect(() => {
    if (!token) { return; }
    fetch("https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  //show LoginView if no user
  if (!user) {
    return (
      <>
        <LoginView onLoggedin={(user, token) => {
          setUser(user);
          setToken(token)
        }} />
        or
        < SignupView />
      </>

    )
  }

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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>
        Logout
      </button>
    </div>
  );
};