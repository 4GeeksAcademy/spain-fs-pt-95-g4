import React, { useState } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          const userData = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            foto: user.foto || '',
            descripcion: user.descripcion || ''
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          navigate('/perfil');
        } else {
          setError('Credenciales incorrectas');
        }
      } catch (err) {
        setError('Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)} 
        className="mb-4"
      >
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <Card className="shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">
            <FaSignInAlt className="me-2" /> Iniciar Sesión
          </h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                <FaSignInAlt className="me-2" />
              )}
              Iniciar Sesión
            </Button>

            <div className="text-center">
              <small className="text-muted">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;