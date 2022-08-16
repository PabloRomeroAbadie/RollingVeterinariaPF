import React, { useState } from "react";
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validateNombreDueño, validateNombreMascota, validateCelular, validateEspecie, validateRaza } from "../../../../helpers/ValidateFields";
import "../../../../../Styles/GeneralStyles.css";
import Swal from "sweetalert2";
import './CrearUsuario.css';

const CrearUsuario = ({ DBU, getUsuario }) => {
    const [email, setEmail] = useState("");
    const [nombreDueño, setNombreDueño] = useState("");
    const [nombreMascota, setNombreMascota] = useState("");
    const [celular , setCelular] = useState("");
    const [raza , setRaza] = useState("");
    const [especie, setEspecie] = useState("");

    const navigate = useNavigate()
    const handleClick = () => {
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !validateEmail(email) ||
            !validateNombreDueño(nombreDueño) ||
            !validateCelular(celular) ||
            !validateNombreMascota(nombreMascota) ||
            !validateEspecie(especie) ||
            !validateRaza(raza) 
        ) {
            Swal.fire("Ops!", " Datos incorrectos .", "error");
            return;
        }
        const newUsuario = {
            email,
            nombreDueño,
            celular,
            nombreMascota,
            especie,
            raza
        }
        Swal.fire({
            title: 'Estan Correctos todos tus Datos ?',
            text: "No podras volver atras !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Datos Guardados ',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(DBU, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUsuario)
                    });
                    if (res.status === 201) {
                        Swal.fire(' Registrado !', ' Tus datos fueron Guardados .', 'success');
                        getUsuario();
                        navigate("/usuario/tabla/");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    return (
        <div className='Registro'>
            <Container className="py-5 DatosRegistro">
                <div ClassName=''>
                    <h1 className='TituloR'>
                        Registrarme en Vet Rolling
                    </h1>
                </div>
                <hr />
                <Form className='RForm p-3 m-3' onSubmit={handleSubmit}>
                    <Row ClassName='RowUsuario' >
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className='Rlabel'>Correo Electronico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingresa un correo electronico"
                                    onChange={({ target }) => setEmail(target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className='Rlabel'>Nombre Completo del Dueño </Form.Label>
                                <Form.Control
                                    type="Text"
                                    placeholder="Ingresar un usuario"
                                    onChange={({ target }) => setNombreDueño(target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className='Rlabel'>Telefono Celular</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Ingresa un telefono"
                                    onChange={({ target }) => setCelular(target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className='Rlabel'>Nombre o Apodo de la Mascota </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa Tu nombre completo"
                                    onChange={({ target }) => setNombreMascota(target.value)} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label>Tipo de Especie</Form.Label>
                                <Form.Select onChange={({ target }) => setEspecie(target.value)} >
                                    <option value="">Tipo de Especie</option>
                                    <option value="perro">Perro</option>
                                    <option value="gato">Gato</option>
                                    <option value="ave">Ave</option>
                                    <option value="reptil">Reptil</option>
                                    <option value="otro">Otro</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className='Rlabel'> Raza de la Mascota</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa la raza"
                                    onChange={({ target }) => setRaza(target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-end">
                        <button className="btn-reservar"
                            onClick={handleClick}>Crear paciente</button>
                    </div>
                </Form >
                <div className="text-end">
                    <Link to="/usuario/tabla/" className="btn-reservar text-decoration-none text-center">  Atras  </Link>
                </div>
            </Container>
        </div >

    );
};

export default CrearUsuario;
