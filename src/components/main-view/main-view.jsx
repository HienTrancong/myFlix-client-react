import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container } from 'react-bootstrap';

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
  //Ternary operator to have 1 row
  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView onLoggedin={(user, token) => {
              setUser(user);
              setToken(token)
            }} />
            or
            < SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              style={{ border: "1px solid green" }}
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div> The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) =>
              <Col key={movie.id} md={3}>
                < MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie)
                  }}
                />
              </Col>)
            }
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>
              Logout
            </button>
          </>
        )}
      </Row>
    </Container>
  );
};