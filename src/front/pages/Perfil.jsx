import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Image, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

const Perfil = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarPerfil = () => {
      try {
        const datosPerfil = JSON.parse(localStorage.getItem('userData'));
        if (!datosPerfil) {
          navigate('/login');
          return;
        }
        setPerfil(datosPerfil);
      } catch (err) {
        setError('Error al cargar el perfil');
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, [navigate]);

  if (cargando) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-primary" onClick={() => window.location.reload()}>
          Recargar
        </Button>
      </Container>
    );
  }

  if (!perfil) return null;

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)} 
        className="mb-3"
      >
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <Card className="shadow-sm">
        <Card.Body className="text-center">
          <div className="d-flex justify-content-end">
            <Button 
              as={Link}
              to="/editar-perfil"
              variant="outline-primary"
              size="sm"
              className="mb-3"
            >
              <FaEdit className="me-1" /> Editar
            </Button>
          </div>
          
          {perfil.foto ? (
            <Image 
              src={perfil.foto} 
              roundedCircle 
              width={150}
              height={150}
              className="mb-3 border"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="d-flex align-items-center justify-content-center mx-auto mb-3 bg-light rounded-circle" 
              style={{ width: '150px', height: '150px' }}
            >
              <span className="text-muted">Sin foto</span>
            </div>
          )}

          <h3>{perfil.nombre}</h3>
          <p className="text-muted">{perfil.email}</p>
          
          {perfil.descripcion ? (
            <Card.Text className="mt-3 text-start">
              {perfil.descripcion}
            </Card.Text>
          ) : (
            <Card.Text className="text-muted mt-3">
              Agrega una descripción en la edición de perfil.
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Perfil;