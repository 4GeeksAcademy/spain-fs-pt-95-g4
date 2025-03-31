import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imagesData from "../imagesData.js"; 




export const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lugares a escoger</h1>
      <div className="row">
        {imagesData.map((img, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <img
              src={img}
              className="img-fluid rounded shadow"
              alt={`Imagen ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
