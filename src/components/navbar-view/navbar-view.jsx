import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarView = ({ user, onLogout, handleSearchInput }) => {

  return (
    <Navbar
      expand="lg"
      className="mb-4"
      sticky="top"
    >
      <Container>
        <Navbar.Brand
          style={{ fontSize: '25px' }}
          as={Link}
          to="/"
        >
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {!user && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign-up</Nav.Link>
            </Nav>
          )}
          {user && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => { onLogout() }}>Log-out</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  id="search-bar"
                  placeholder="Search by title"
                  type="search"
                  className="md-2"
                  aria-label="Search"
                  onChange={handleSearchInput}
                />
              </Form>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};