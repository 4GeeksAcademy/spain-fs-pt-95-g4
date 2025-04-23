import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imagesData from "../imagesData.js";
import { FaRegHeart, FaHeart, FaPaperPlane, FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import MapContainer from "../components/MapContainer";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState(imagesData);
  const [newComments, setNewComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    
    setSelectedCategory(category || null);
    setSearchQuery(search || "");
  }, [searchParams]);

  const displayedImages = useMemo(() => {
    let filteredImages = images;
    
    if (selectedCategory) {
      filteredImages = filteredImages.filter(img => img.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredImages = filteredImages.filter(img => 
        img.name.toLowerCase().includes(query) ||
        img.description.toLowerCase().includes(query) ||
        img.category.toLowerCase().includes(query)
      );
    }
    
    return filteredImages;
  }, [images, selectedCategory, searchQuery]);

  const places = useMemo(() => {
    return displayedImages.map(img => ({
      ...img,
      active: selectedLocation && img.id === selectedLocation.id
    }));
  }, [displayedImages, selectedLocation]);

  const toggleFavorite = (id) => {
    setImages(images.map(img =>
      img.id === id ? { ...img, favorite: !img.favorite } : img
    ));
  };

  const addComment = (id) => {
    if (newComments[id]?.trim()) {
      setImages(images.map(img =>
        img.id === id ? {
          ...img,
          comments: [...img.comments, { username: "UsuarioActual", contenido: newComments[id] }]
        } : img
      ));
      setNewComments({ ...newComments, [id]: "" });
    }
  };

  const deleteComment = (imgId, indexToDelete) => {
    setImages(images.map(img =>
      img.id === imgId ? {
        ...img,
        comments: img.comments.filter((_, idx) => idx !== indexToDelete)
      } : img
    ));
  };

  const toggleExpandComments = (id) => {
    setExpandedComments({
      ...expandedComments,
      [id]: !expandedComments[id]
    });
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleImageClick = (img) => {
    if (img.location) {
      setSelectedLocation({
        id: img.id,
        name: img.name,
        location: img.location
      });
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">
        {selectedCategory 
          ? `Categoría: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
          : searchQuery
          ? `Resultados para: "${searchQuery}"`
          : "Escoge tu lugar"}
      </h1>
      
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-4">
          <div className="image-card sticky-top" style={{ top: '20px' }}>
            <h5 className="mb-3">Mapa de ubicaciones</h5>
            <div style={{ height: '400px' }}>
              <MapContainer 
                onLocationSelect={handleLocationSelect}
                activeLocation={selectedLocation?.location}
                places={places}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-md-12">
          <div className="row">
            {displayedImages.length > 0 ? (
              displayedImages.map((img) => (
                <div key={img.id} className="col-md-6 col-lg-4 mb-4">
                  <div 
                    className={`image-card h-100 d-flex flex-column position-relative ${selectedLocation?.id === img.id ? 'active-location' : ''}`}
                    onClick={() => handleImageClick(img)}
                  >
                    <button
                      className="favorite-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(img.id);
                      }}
                    >
                      {img.favorite ? (
                        <FaHeart className="text-purple" />
                      ) : (
                        <FaRegHeart className="text-purple" />
                      )}
                    </button>

                    <h3 className="mb-3 text-center border-bottom pb-2">
                      {img.name}
                    </h3>

                    <div className="image-wrapper">
                      <img
                        src={img.src}
                        className="img-fluid rounded mb-3"
                        alt={img.name}
                      />
                    </div>

                    <p className="text-muted mb-3 small">
                      {img.description || "Descripción no disponible"}
                    </p>

                    <div className="comments-section mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="text-uppercase text-muted small mb-0">
                          Comentarios
                        </h6>
                        <button
                          className="btn btn-link btn-sm p-0 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpandComments(img.id);
                          }}
                        >
                          {expandedComments[img.id] ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </div>

                      {expandedComments[img.id] && (
                        <div className="mb-3 animate-expand">
                          {img.comments.length > 0 ? (
                            img.comments.map((comment, index) => (
                              <div
                                key={index}
                                className="d-flex justify-content-between align-items-center small mb-1"
                              >
                                <span>
                                  <strong>{comment.username}:</strong> {comment.contenido}
                                </span>
                                <button
                                  className="btn btn-link text-danger btn-sm p-0 delete-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteComment(img.id, index);
                                  }}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            ))
                          ) : (
                            <p className="small text-muted">Sin comentarios aún</p>
                          )}
                        </div>
                      )}

                      <div 
                        className="input-group input-group-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Añadir comentario..."
                          value={newComments[img.id] || ""}
                          onChange={(e) =>
                            setNewComments({ ...newComments, [img.id]: e.target.value })
                          }
                          onKeyUp={(e) => e.key === 'Enter' && addComment(img.id)}
                        />
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => addComment(img.id)}
                        >
                          <FaPaperPlane />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h3>No se encontraron resultados</h3>
                <p className="text-muted">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};