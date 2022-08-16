import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../../../Styles/GeneralStyles.css";
import { validateContraseña, validateEmail, validateNombreDueño } from '../../../helpers/ValidateFields';

const RegistroUsuario = ( { DBR }) => {
    const [nombreApellido, setNombreApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    const navigate = useNavigate();

        const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !validateNombreDueño(nombreApellido) ||
            !validateEmail(email) ||
            !validateContraseña(contraseña)
            )
            {
                Swal.fire("Ops!", " Datos incorrectos .", "error");
                return;
            }

        const newUsuarioRegistrado = {
            nombreApellido,
            email,
            contraseña
        }

        Swal.fire({
            title: 'Datos ingresados correctamente',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Guardar datos',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(DBR, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newUsuarioRegistrado)
                    });
                    if (res.status === 201) {
                        Swal.fire(' Registrado !', ' Tus datos fueron Guardados .', 'success');
                        navigate("/login");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
    
    return (
        <div>
            <Container className='my-5'>
                <Row>
                    <div className='d-flex justify-content-center'>
                    <Col sm ={12} md={6} className='text-center '>
                        <Form onSubmit={handleSubmit}>
                            <Col className="my-3">
                                <Form.Group>
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder='Ingrese nombre y apellido'
                                        onChange={({ target }) => setNombreApellido(target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="my-3">
                                <Form.Group>
                                    <Form.Label>Email de Contacto</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder='Ingrese email'
                                        onChange={({ target }) => setEmail(target.value)}>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="my-3">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className='Rlabel'>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={({ target }) => setContraseña(target.value)} />
                                        <Form.Text className="text-muted">
                                            Debe contener como minimo una mayuscula, minuscula y un numero.
                                        </Form.Text>
                            </Form.Group>
                            
                            </Col>
                            <button className='btn-reservar mt-3'>Registrarme</button>
                        </Form>
                            <Link className='btn-reservar text-decoration-none my-3'  to="/login">Atras</Link>
                    </Col>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default RegistroUsuario;