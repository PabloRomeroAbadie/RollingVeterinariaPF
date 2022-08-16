import React from "react";
import publicidad from "../../Assets/media/publicidad.video.mp4";
import "./home.css";

const Publicidad = () => {
  return (
    <div className="margin-components">
        <h2 className="text-center display-4 fw-bold">
          Alimentacion de alta calidad
        </h2>
        <div>
          <video
            className="publicidadVideoHome"
            src={publicidad}
            alt="publicidad"
            autoPlay
            loop
            muted
            controls
          ></video>
        </div>
    </div>
  );
};

export default Publicidad;
