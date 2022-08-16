import React from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Turno = ({ turno, DBT, getTurno }) => {
  // Funcion para eliminar turno
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Estas Seguro/a ?',
      text: "Perderas el turno elegido !!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${DBT}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.status === 200) {
            Swal.fire('Eliminado !', 'Su turno fue Carcelado!', 'success');
            getTurno();
          }
        } catch (error) {
          console.error(error);
        }
      }

    });

  }
  return (
    <tr>
      <td>{turno.nombreDueño}</td>
      <td>{turno.nombreMascota}</td>
      <td>{turno.raza}</td>
      <td>{turno.veterinario}</td>
      <td>{turno.fecha}</td>
      <td>{turno.horario}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link to={`/turno/editar/${turno._id}`} className="btn-editar  text-decoration-none text-center mx-1">Editar Turno</Link>
          <button className="btn-borrar text-decoration-none text-center mx-1"
            onClick={() => handleDelete(turno._id)} >
            Borrar turno</button>
        </div>
      </td>
    </tr>

  );
};

export default Turno;