import React, { useState } from 'react';
import { Container, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(u => u.email === formData.email)) {
          setError('Este email ya está registrado');
          setLoading(false);
          return;
        }

        const newUser = {
          id: uuidv4(),
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          foto: '',
          descripcion: '',
          fechaRegistro: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

     
        const userData = {
          id: newUser.id,
          nombre: newUser.nombre,
          email: newUser.email,
          foto: newUser.foto,
          descripcion: newUser.descripcion
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        navigate('/perfil');
      } catch (err) {
        setError('Error al registrar el usuario');
      } finally {
        setLoading(false);
      }
    }, 1500);
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
            <FaUserPlus className="me-2" /> Crear Cuenta
          </h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
              <Form.Text className="text-muted">Mínimo 6 caracteres</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
                <FaUserPlus className="me-2" />
              )}
              Registrarse
            </Button>

            <div className="text-center">
              <small className="text-muted">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;