import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateUser } from "../profile-view/update-user";
import { NavbarView } from "../navbar-view/navbar-view";
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {

  //localStorage info about loggined user
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  //hooks movies to array
  const [movies, setMovies] = useState([]);

  //hooks user and token from localStorage (if had) or new
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //onLogout function
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear()
  }

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
  return (
    <BrowserRouter>
      <NavbarView
        user={user}
        onLogout={onLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    < SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedin={(user, token) => {
                        setUser(user);
                        setToken(token)
                      }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      token={token}
                      setUser={setUser}
                      onLogout={onLogout} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/updateUser"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <Col md={5}>
                    <UpdateUser
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            } />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <Col md={5}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            } />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) :
                  // movies.length === 0 ? (
                  //   <Col> The list is empty!</Col>
                  // ) : 
                  (
                    <>
                      {movies.map((movie) =>
                        <Col className="mb-4" key={movie._id} md={3}>
                          < MovieCard
                            movie={movie}
                          />
                        </Col>
                      )
                      }
                    </>
                  )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter >
  );
};
