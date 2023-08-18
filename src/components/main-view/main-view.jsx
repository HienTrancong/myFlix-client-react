import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
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

  //hooks to filter movies by search function
  const [filterMovies, setFilterMovies] = useState([]);

  //onLogout function
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear()
  }

  //search function
  const handleSearchInput = (e) => {
    const searchWord = e.target.value.toLowerCase();
    let tempArray = movies.filter((movie) => movie.Title.toLowerCase().includes(searchWord));
    setFilterMovies(tempArray);
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
        onLogout={onLogout}
        handleSearchInput={handleSearchInput}
        style={{ paddingLeft: 0, paddingRight: 0 }} />
      <Row className="justify-content-md-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
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

                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    setUser={setUser}
                    onLogout={onLogout} />

                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
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
                      {filterMovies.map((movie) =>
                        <Col
                          className="mb-4"
                          key={movie._id}
                          xl={2}
                          lg={3}
                          md={4}
                          xs={6}
                        >
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
