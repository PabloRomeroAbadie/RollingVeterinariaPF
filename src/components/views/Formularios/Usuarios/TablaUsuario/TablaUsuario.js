import React from 'react';
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Usuario from "./Usuario/Usuario";
import "../../../../../Styles/GeneralStyles.css";

const TablaUsuario = ({usuario, DBU, getUsuario}) => {
    return (
        <div>
             <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Tabla de Pacientes</h1>
          <Link to="/usuario/crear" className="btn-reservar text-decoration-none text-center">Crear Paciente</Link>
        </div>
        <hr />
        {/* Tabla de turnos */}
        {usuario.length !== 0 ?
          <Table bordered hover responsive
            className="align-middle mt-3">
            <thead>
              <tr>
                <th>Email </th>
                <th>Nombre del dueÃ±o</th>
                <th>Celular</th>
                <th>Nombre o Apodo de la Mascota</th>
                <th>Tipo de Especie</th>
                <th>Raza</th>
              </tr>
            </thead>
            <tbody>
              {usuario.map((usuario) => (
                <Usuario key={usuario.id}
                usuario={usuario}
                DBU={DBU}
                getUsuario={getUsuario} />
              ))}
            </tbody>
          </Table>
          :
          <div className="no-products-found d-flex align-items-center justify-content-center">
            {/* No usuarios  creados */}
            <h1>ð¾ð  No hay Pacientes Registrados ðð¾</h1>
          </div> 
        }
        <div className="text-end">
        <Link to="/PagAdmin/" className="btn-reservar text-decoration-none text-center">  Menu  </Link>
        </div>
      </Container>
    </div>
    );
};

export default TablaUsuario;