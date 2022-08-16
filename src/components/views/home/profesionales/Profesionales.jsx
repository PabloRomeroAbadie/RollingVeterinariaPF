import React, {useState, useEffect} from "react";
import CardProfesional from "./CardProfesional";
import "../home.css"

const Profesionales = () => {
  const [veterinarios, setVeterinarios] = useState(null);

  const DBVET = process.env.REACT_APP_API_VETERINARIOS;

  useEffect(() => {
    getVeterinarios();
  }, [])
  
  const getVeterinarios = async () => {
     try{
        const res = await fetch(DBVET)
        const serviciosApi = await res.json()
        setVeterinarios(serviciosApi)
    } catch (error) {
      console.error(error);
    }
}

  return (
    <div className="container margin-components">
        <h2 className="text-black display-4 mt-5 text-center fw-bold">Licenciados Rolling Vet</h2>
      <div className="d-flex justify-content-center">
        <div className="row">
          {veterinarios && veterinarios.map((el, i) => {
            return(
              <div key={i} className="col-lg-6 col-md-12 col-sm-12 my-3 text-center">
                <CardProfesional imagen={el.imgVeterinario} nombre={el.nombre} apellido={el.apellido} descripcion={el.descripcion}></CardProfesional>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Profesionales;
