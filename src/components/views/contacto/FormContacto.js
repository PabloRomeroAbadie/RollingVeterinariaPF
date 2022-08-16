import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { validateNombreDueño, validateEmail, validateConsulta } from "../../helpers/ValidateFields";
import Swal from 'sweetalert2';

const FormContacto = () => {
        const [nombreApellido, setNombreApellido] = useState("");
        const [email, setEmail] = useState("");
        const [consulta, setConsulta] = useState("");
    
        const URL = process.env.REACT_APP_API_CONSULTA;
    
        const navigate = useNavigate();
        const handleClick = () => {
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            emailjs.sendForm('service_sktzuej', 'template_wf5oikv', e.target, 'user_DfiFfXrlbOM3tOLWjQzRU')
            .then((result) => {
            }, (error) => {
                console.log(error.text);
            });
            if (
                !validateNombreDueño(nombreApellido) ||
                !validateEmail(email) ||
                !validateConsulta(consulta)) {
                Swal.fire("Ops!", " Datos incorrectos .", "error");
                return;
            }
            const newConsulta = {
                nombreApellido,
                email,
                consulta
            }
            Swal.fire({
                title: '¿Realizar consulta?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await fetch(URL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newConsulta)
                        });
                        if (res.status === 201) {
                            Swal.fire('Consulta enviada!', ' Gracias por su consulta, aguarde respuesta.', 'success');
                            navigate("/");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={12} className="my-3">
                                    <Form.Group>
                                        <Form.Label>Nombre y Apellido</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder='Ingrese nombre y apellido'
                                            name="nombreCompleto"
                                            onChange={({ target }) => setNombreApellido(target.value)}>                                            
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} className="my-3">
                                    <Form.Group>
                                        <Form.Label>Email de Contacto</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder='Ingrese email'
                                            name="email"
                                            onChange={({ target }) => setEmail(target.value)}>
                                            
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} className="my-3">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Realice su consulta aqui</Form.Label>
                                        <Form.Control as="textarea" rows={3} 
                                        onChange={({ target }) => setConsulta(target.value)}/>
                                    </Form.Group>
                                </Col>
                                <div className='text-center'>
                                    <button className='btn-reservar text-center  my-2' value="send" onClick={handleClick}>Enviar</button>
                                </div>
                            </Row>
                        </Form>
        </Container>
    );
};

export default FormContacto;