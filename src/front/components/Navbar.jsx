import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Form, Button, Badge } from "react-bootstrap";
import { Search, Heart } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaUserEdit, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesCount(savedFavorites.length);
    setUsuarioLogueado(!!localStorage.getItem('userData'));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUsuarioLogueado(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-3">
      <Container>
        <Navbar.Brand as={Link} to="/">HiddenWorld</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="categories-dropdown">
              <NavDropdown.Item as={Link} to="/?category=misticos">Lugares Místicos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?category=paranormal">Paranormal</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?category=hechos%20por%20el%20hombre">Hechos por el hombre</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?category=naturales">Naturales</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Países" id="countries-dropdown">
              <NavDropdown.Item as={Link} to="/?country=estados%20unidos">Estados Unidos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=india">India</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=irlanda">Irlanda</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=japon">Japón</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=republica%20checa">República Checa</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=rumania">Rumania</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=tanzania">Tanzania</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=turquia">Turquía</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=venecia">Venecia</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?country=yemen">Yemen</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Buscar..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              <Search size={18} />
            </Button>
          </Form>

          <Nav>
            <Button 
              as={Link}
              to="/favorites"
              variant="outline-light" 
              className="me-2 d-flex align-items-center"
            >
              <Heart className="me-1" size={18} />
              Favoritos
              {favoritesCount > 0 && <Badge bg="danger" className="ms-1">{favoritesCount}</Badge>}
            </Button>
            
            {usuarioLogueado ? (
              <NavDropdown 
                title={<><FaUser className="me-1" /> Mi Cuenta</>} 
                id="user-dropdown" 
                align="end"
              >
                <NavDropdown.Item as={Link} to="/perfil">
                  <FaUser className="me-2" /> Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/editar-perfil">
                  <FaUserEdit className="me-2" /> Editar Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light"
                  className="me-2 d-flex align-items-center"
                >
                  <FaSignInAlt className="me-1" /> Iniciar Sesión
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary"
                  className="d-flex align-items-center"
                >
                  <FaUserPlus className="me-1" /> Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;