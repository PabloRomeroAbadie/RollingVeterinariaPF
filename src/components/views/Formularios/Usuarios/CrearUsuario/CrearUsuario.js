import React, { useState } from "react";
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validateNombreDueño, validateNombreMascota, validateContraseña, validateFecha, validateCelular } from "../../../../helpers/ValidateFields";
import "../../../../../Styles/GeneralStyles.css";
import Swal from "sweetalert2";
import './CrearUsuario.css';

const CrearUsuario = ({ DBU, getUsuario }) => {

    //States 
    const [email, setEmail] = useState("");
    const [nombreDueño, setNombreDueño] = useState("");
    const [nombreMascota, setNombreMascota] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [fecha, setFecha] = useState("");
    const [celular, setCelular] = useState("");

    // Navigate 
    const navigate = useNavigate()
    const handleClick = () => {

    }

    // Funcion para guardar los datos o crear el producto 
    const handleSubmit = (e) => {
        e.preventDefault();

        // validar los campos
        if (
            !validateEmail(email) ||
            !validateNombreDueño(nombreDueño) ||
            !validateNombreMascota(nombreMascota) ||
            !validateContraseña(contraseña) ||
            !validateFecha(fecha) ||
            !validateCelular(celular)
        ) {
            Swal.fire("Ops!", " Datos incorrectos .", "error");
            return;
        }

        // Enviar los datos para guardarlos 
        const newUsuario = {
            email,
            nombreDueño,
            nombreMascota,
            contraseña,
            fecha,
            celular
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
                        navigate("/usuario/tabla");
                    }
                } catch (error) {
                    console.log(error);
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
                <div className='Form-Registro'>
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
                                    <Form.Label className='Rlabel'>Nombre o Apodo de la Mascota </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa Tu nombre completo"
                                        onChange={({ target }) => setNombreMascota(target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className='Rlabel'>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={({ target }) => setContraseña(target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className='Rlabel'>Fecha de Nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Ingresa tu fecha de Nacimiento"
                                        onChange={({ target }) => setFecha(target.value)}
                                        max="2004-05-01" />
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
                        </Row>
                        <div className="text-end">
                            <button className="btn-reservar"
                                onClick={handleClick}>Registrame</button>
                        </div>
                    </Form >
                </div>
                <div className="text-end">
                    <Link to="/usuario/tabla/" className="btn-reservar text-decoration-none text-center">  Atras  </Link>
                </div>

            </Container>
        </div >

    );
};

export default CrearUsuario;
