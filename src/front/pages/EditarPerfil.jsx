import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Image, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaTrash } from 'react-icons/fa';

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nombre: '',
    email: '',
    descripcion: '',
    foto: ''
  });
  const [fotoPrevia, setFotoPrevia] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          navigate('/login');
          return;
        }
        setPerfil(userData);
        if (userData.foto) setFotoPrevia(userData.foto);
      } catch (err) {
        setError('Error al cargar datos del usuario');
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError('La imagen debe ser menor a 2MB');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPrevia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarFoto = () => {
    setFotoPrevia('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError('');

    try {
      
      const updatedUserData = {
        ...perfil,
        foto: fotoPrevia || perfil.foto
      };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      // 2. Actualizar también en el array de users (si existe)
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(user => 
        user.email === perfil.email ? { ...user, ...updatedUserData } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      navigate('/perfil');
    } catch (err) {
      setError('Error al guardar los cambios');
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Editar Perfil</h3>
            <Button 
              variant="outline-secondary"
              onClick={() => navigate('/perfil')}
            >
              <FaTimes className="me-1" /> Cancelar
            </Button>
          </div>

          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 text-center">
              <div className="position-relative d-inline-block">
                {(fotoPrevia || perfil.foto) ? (
                  <>
                    <Image 
                      src={fotoPrevia || perfil.foto} 
                      roundedCircle 
                      width={150}
                      height={150}
                      className="mb-3 border"
                      style={{ objectFit: 'cover' }}
                      alt="Foto de perfil"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 rounded-circle"
                      onClick={eliminarFoto}
                      style={{ width: '30px', height: '30px' }}
                      aria-label="Eliminar foto"
                    >
                      <FaTrash size={12} />
                    </Button>
                  </>
                ) : (
                  <div className="d-flex align-items-center justify-content-center mx-auto mb-3 bg-light rounded-circle" 
                       style={{ width: '150px', height: '150px' }}>
                    <span className="text-muted">Sin foto</span>
                  </div>
                )}
              </div>
              
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="mx-auto"
                style={{ maxWidth: '300px' }}
              />
              <Form.Text className="text-muted d-block mt-2">
                Formatos: JPG, PNG (Máx. 2MB)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={perfil.nombre}
                onChange={handleChange}
                required
                minLength="2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={perfil.email}
                disabled
                className="bg-light"
              />
              <Form.Text className="text-muted">
                Para cambiar el email contacta al administrador
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="descripcion"
                value={perfil.descripcion}
                onChange={handleChange}
                placeholder="Cuéntanos sobre ti..."
                maxLength="500"
              />
              <Form.Text className="text-muted">
                {perfil.descripcion?.length || 0}/500 caracteres
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/perfil')}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={guardando}
              >
                {guardando ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <FaSave className="me-1" /> Guardar cambios
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditarPerfil;