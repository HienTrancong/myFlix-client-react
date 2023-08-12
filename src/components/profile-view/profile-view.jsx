import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Modal, Card, CardGroup, } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export const ProfileView = ({ user, token, movies, setUser, onLogout }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birhday);
  const [showModal, setShowModal] = useState(false);

  //modal when delete profile
  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }

  //Filter movies to include array of user's favoritemovies id
  let favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id)
  });

  //update user
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return (
          response.json(),
          alert("Update successful")
        )
      } else {
        alert("Update failed");
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  //Delete user
  const handleDeleteUser = (event) => {
    event.preventDefault();
    fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        localStorage.clear()
        onLogout();
      } else {
        alert("Something went wrong.")
      }
    });
  }


  console.log("here fav", favoriteMovies);
  return (
    <Container>
      <Row>
        <Col>
          <h1>User Profile</h1>
          {console.log("here!", user, favoriteMovies)}
          <p>Username: {user.Username}</p>
          <p>Email: {user.Email}</p>
          <div>Birthday: {user.Birthday.slice(0, 10)}</div>
        </Col>
        <Link to={"/updateUser"}>
          <Button variant="primary" type="submit">
            Update user info
          </Button>
        </Link >
        <Button variant="danger" type="submit" onClick={handleDeleteUser}>
          Deregister
        </Button>

      </Row>
      <Row>
        <Col>
          <h1>Favorite movies</h1>
          {favoriteMovies.map((movie) =>
            <Col className="mb-4" key={movie._id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          )}
        </Col>
      </Row>
    </Container >
  )
};