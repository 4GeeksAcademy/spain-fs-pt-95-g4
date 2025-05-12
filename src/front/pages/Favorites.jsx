import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imagesData from "../imagesData.js";

const Favorites = () => {
  const navigate = useNavigate();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoriteImages = imagesData.filter(img => favorites.includes(img.id));

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    navigate(0); 
  };

  return (
    <Container className="mt-4">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <h1 className="text-center mb-4">Mis Favoritos</h1>

      {favoriteImages.length > 0 ? (
        <Row>
          {favoriteImages.map(img => (
            <Col key={img.id} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={img.src} />
                <Card.Body>
                  <Card.Title>{img.name}</Card.Title>
                  <Card.Text className="small text-muted">
                    {img.description.substring(0, 100)}...
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant={favorites.includes(img.id) ? "danger" : "outline-secondary"} 
                    onClick={() => toggleFavorite(img.id)}
                    size="sm"
                  >
                    {favorites.includes(img.id) ? <FaHeart /> : <FaRegHeart />}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    as={Link}
                    to={`/single/${img.id}`}
                  >
                    Ver detalles
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          <h4>No tienes favoritos aún</h4>
          <Button variant="primary" onClick={() => navigate("/")} className="mt-2">
            Explorar lugares
          </Button>
        </Alert>
      )}
    </Container>
  );
};

export default Favorites;