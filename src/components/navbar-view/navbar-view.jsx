import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarView = ({ user, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/signup">Sign-up</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Button onClick={() => { onLogout() }}>Log-out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};