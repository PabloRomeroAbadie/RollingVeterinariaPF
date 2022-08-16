import React from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";




const Usuario = ({ usuario, DBU, getUsuario }) => {

  const handleDelete = (id) => {

    Swal.fire({
      title: 'Estas Seguro/a ?',
      text: "Los  Datos Se borraran!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar ',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${DBU}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },

          });
          if (res.status === 200) {
            Swal.fire('Eliminado  !', ' Sus datos fueron elimandos !.', 'success');
            getUsuario();
          }

        } catch (error) {
          console.error(error);
        }
      }

    });

  }
  return (

    <tr>
      <td>{usuario.email}</td>
      <td>{usuario.nombreDueño}</td>
      <td>{usuario.celular}</td>
      <td>{usuario.nombreMascota}</td>
      <td>{usuario.especie}</td>
      <td>{usuario.raza}</td>
      <td className="w-25">
        <div className="d-flex justify-content-center">
          <Link to={`/usuario/editar/${usuario._id}`} className="btn-editar   text-decoration-none text-center mx-1">Editar Usuario</Link>
          <button className="btn-borrar text-decoration-none text-center mx-1"
            onClick={() => handleDelete(usuario._id)} >
            Borrar Usuario</button>
        </div>
      </td>
    </tr>


  );
};

export default Usuario;