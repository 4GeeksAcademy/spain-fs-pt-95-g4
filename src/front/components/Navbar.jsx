import React from "react";
import { Navbar, Nav, Form, FormControl, Container, NavDropdown } from "react-bootstrap";
import { Search } from "react-feather";

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container>
        <Navbar.Brand href="#home">HiddenWorld</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#misticos">Lugares Místicos</NavDropdown.Item>
              <NavDropdown.Item href="#paranormal">Paranormal</NavDropdown.Item>
              <NavDropdown.Item href="#paises">Países</NavDropdown.Item>
              <NavDropdown.Item href="#rutas">Rutas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex search-form">
  <FormControl
    type="search"
    placeholder="Search..."
    className="me-2 search-input"
    aria-label="Search"
  />
  <Search className="search-icon" />
</Form>

          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
