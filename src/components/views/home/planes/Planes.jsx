import React from "react";
import { useState, useEffect } from "react";
import CardPlan from "./CardPlan";
import "../home.css";


const Planes = () => {
  const [planes, setPlanes] = useState(null);

  const DBPLANES = process.env.REACT_APP_API_PLANES;

  useEffect(() => {
    getPlanes();
  }, []);

  const getPlanes = async () => {
    try {
      const res = await fetch(DBPLANES);
      const planesApi = await res.json();
      setPlanes(planesApi);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="margin-components">
      <h2 className="text-center display-4 fw-bold mt-5">
        Nuestros Planes:
      </h2>
      <div className="row">
        {planes &&
          planes.map((el, i) => {
            return (
              <div key={i} className="my-5">
                <CardPlan
                  imagen={el.planImg}
                  nombre={el.planTitle}
                  descripcion={el.planDescripcion}
                ></CardPlan>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Planes;