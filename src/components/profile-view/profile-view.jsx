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

  //update Uuser
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    console.log(user);
    fetch(`https://myflix-moviesdata-api-2a7e65490948.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert("Update successful");
        return response.json();
      } else {
        alert("Update failed");
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }).catch((error) => {
      console.log(error);
      alert("Something went wrong");
    });
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
  return (
    <>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <h1>User Profile</h1>
          {console.log("here!", user, favoriteMovies)}
          <p>Username: {user.Username}</p>
          <p>Email: {user.Email}</p>
          <div>Birthday: {user.Birthday.slice(0, 10)}</div>
        </Card>
        <Button
          variant="danger" type="submit" className="mt-3" onClick={handleDeleteUser}>
          Delete account
        </Button>
      </Col>
      <Col md={6}>
        <Card className="mt-2 mb-3">
          <Card.Body>
            <Card.Title>Update info</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="5"
                  className="bg-light"
                >
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="5"
                >
                </Form.Control>
                <Form.Text className="text-muted">
                  Password is required
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Birthday
                </Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={12}>
        <h3 className="mt-3 mb-3">Favorite movies</h3>
      </Col>
      {favoriteMovies.map((movie) =>
      (<Col className="mb-4" key={movie._id} xl={2} lg={3} md={4} xs={6}>
        <MovieCard movie={movie} />
      </Col>
      ))}
    </>
  );
};