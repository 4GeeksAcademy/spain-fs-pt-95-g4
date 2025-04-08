import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imagesData from "../imagesData.js";
import { FaRegHeart, FaHeart, FaPaperPlane, FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export const Home = () => {
  const [images, setImages] = useState(imagesData);
  const [newComments, setNewComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

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
          comments: [...img.comments, newComments[id]]
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Escoge tu lugar</h1>
      <div className="row">
        {images.map((img) => (
          <div key={img.id} className="col-md-4 col-sm-6 mb-4">
            <div className="bg-white p-3 rounded shadow-sm h-100 d-flex flex-column position-relative">

              <button
                className="favorite-btn position-absolute"
                onClick={() => toggleFavorite(img.id)}
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

              <img
                src={img.src}
                className="img-fluid rounded mb-3"
                alt={img.name}
              />

              <p className="text-muted mb-3 small">
                {img.description || "Descripción no disponible"}
              </p>

              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-uppercase text-muted small mb-0">
                    Comentarios
                  </h6>
                  <button
                    className="btn btn-link btn-sm p-0 text-primary"
                    onClick={() => toggleExpandComments(img.id)}
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
                          <span>• {comment}</span>
                          <button
                            className="btn btn-link text-danger btn-sm p-0 delete-icon"
                            title="Eliminar"
                            onClick={() => deleteComment(img.id, index)}
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

                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Añadir comentario..."
                    value={newComments[img.id] || ""}
                    onChange={(e) =>
                      setNewComments({ ...newComments, [img.id]: e.target.value })
                    }
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
        ))}
      </div>
    </div>
  );
};
