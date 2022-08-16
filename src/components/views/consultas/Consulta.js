import React from 'react';
import Swal from 'sweetalert2';

const Consulta = ({ consulta, DBC, getConsulta }) => {

    const handleDelete = (id) => {
        Swal.fire({
          title: 'Estas Seguro/a ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await fetch(`${DBC}/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (res.status === 200) {
                Swal.fire('Eliminado !', 'la consulta fue eliminada!', 'success');
                getConsulta();
              }
            } catch (error) {
              console.error(error);
            }
          }
        });
      }
    return (
        <tr>
            <td>{ consulta.nombreApellido }</td>
            <td>{ consulta.email}</td>
            <td>{ consulta.consulta}</td>
            <td className="w-25">
                <div className="d-flex justify-content-center">
                    <button className="btn-borrar text-decoration-none text-center mx-1"
                        onClick={() => handleDelete(consulta._id)}>
                        Borrar Consulta</button>
                </div>
            </td>
        </tr>
    );
};

export default Consulta;