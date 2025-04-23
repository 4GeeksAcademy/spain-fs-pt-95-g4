import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategorySelect = (category) => {
    navigate(`/?category=${category}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>HiddenWorld</Navbar.Brand>
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

          <Form className="d-flex search-form" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2 search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="search-icon-button"
            >
              <Search className="search-icon" />
            </button>
          </Form>

          <Nav>
            <Nav.Link onClick={() => navigate("/perfil")}>Perfil</Nav.Link>
            <Nav.Link onClick={() => navigate("/editar-perfil")}>Editar Perfil</Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;