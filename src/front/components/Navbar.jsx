import React from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(`/?category=${category}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
      <Container>
        <Navbar.Brand href="/">HiddenWorld</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleCategorySelect("misticos")}>
                Lugares Místicos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategorySelect("paranormal")}>
                Paranormal
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleCategorySelect("paises")}>
                Países
              </NavDropdown.Item>
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