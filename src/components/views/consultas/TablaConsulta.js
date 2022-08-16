import React from 'react';
import { Container,  Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Consulta from './Consulta';

const TablaConsulta = ({ consulta, DBC, getConsulta }) => {
    return (
        <div className='container'>
            <Container className="py-5">
            <div className='my-5'>
                <h1 className='display-5'>Consultas realizadas:</h1>
                <hr />
            </div>
            {consulta.length > 0 ?
                            <Table striped bordered responsive hover
                            className="align-middle mt-3">
                                <thead>
                                    <tr>
                                        <th>Nombre y apellido</th>
                                        <th>Email</th>
                                        <th>Consulta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consulta.map((consulta) => (
                                        <Consulta
                                            key={consulta._id}
                                            consulta={consulta}
                                            DBC={DBC}
                                            getConsulta={getConsulta} />
                                    ))}
                                </tbody>
                            </Table>
                            :
                        <div className="no-products-found d-flex align-items-center justify-content-center">
                            <h1>🐾🐕  No hay Consultas realizadas 🐈🐾 </h1>
                        </div>}
                        <div className="text-end">
                            <Link to="/PagAdmin/" className="btn-reservar text-decoration-none text-center">  Menu  </Link>
                        </div>
            </Container>
        </div>
    );
};

export default TablaConsulta;