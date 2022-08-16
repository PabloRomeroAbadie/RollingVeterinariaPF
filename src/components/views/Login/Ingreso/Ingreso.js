import React, { useState } from "react";
import '../Ingreso/Ingreso.css';
import { Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validateContraseña } from "../../../helpers/ValidateFields";
import Swal from "sweetalert2";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "../../../../Styles/GeneralStyles.css";

const Ingreso = () => {

  const gmail = process.env.REACT_APP_GMAIL;
  const password = process.env.REACT_APP_CLAVE;

  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("faEye");

  let session = false;
  const navigate = useNavigate()
  
  const handleClick = () => {
  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(faEye);
      setType('text');
    } else {
      setIcon(faEye);
      setType('password');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(
      !validateEmail(email) ||
      !validateContraseña(contraseña) 
      ) {
          Swal.fire("Datos Incorrectos !", "Intenta Nuevamente.", "error");
          return;
      }
        session = true;
        if (email === gmail && contraseña === password) {
            sessionStorage.setItem("stateSession", JSON.stringify(session));
            Swal.fire(
              'Bienvenido "ADMINISTRADOR"!',
              "Veterinaria Rolling 2022",
              "success"
            );
            setTimeout(() => {
              navigate("/PagAdmin");
            }, 1000);
          }else{
            Swal.fire(
              'ERROR!',
              "Los datos ingresados son incorrectos",
              "error"
            );
          }
        };

  return (
    <div>
      <Container>
        <div className="d-flex flex-column justify-content-center boxc py-5 mx-5">
          <h1 className="mx-5 TituloIngreso">Bienvenidos! </h1>
          <hr />
          <div>
            <Form className='FormLogin p-3 m-3' onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="colingreso">
                  <Form.Group className="usuario" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="email"
                      type="email"
                      placeholder=" Email"
                      onChange={({ target }) => setEmail(target.value)}
                      required />
                  </Form.Group>
                  <div>
                    <Form.Group className="mb-3 Contraseña" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <div className="container-contraseña">
                        <Form.Control className='contraseña'
                          type={type}
                          placeholder="Contraseña"
                          onChange={({ target }) => setContraseña(target.value)}
                          required />
                        <FontAwesomeIcon
                          className='icon'
                          id='icon'
                          icon={faEye}
                          onClick={handleToggle}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      className='checkboxL'
                      type="checkbox"
                      name="terminos"
                      id="terminos"
                      label="Recordar mis datos"
                    />
                  </Form.Group>
                  <div className="botoningresar">
                    <button className="btn-registro"
                      onClick={handleClick}>
                      Ingresar</button>
                  </div>
                  <Link className="nav-link login" to="*">Olvide mi Contraseña</Link>
                </Col>
                <Col md={6} className="botoningresar mt-2" >
                  <div className='Opcionesdeingreso'>
                    <p className="text-secondary my-4">O ingresá con</p>
                    <div className='fontAIconL'>
                      <Link to="*" >
                        <FontAwesomeIcon className="IconL px-3" icon={faGoogle} />
                      </Link>
                      <Link to="*">
                        <FontAwesomeIcon className='IconL px-3' icon={faFacebook} />
                      </Link>
                    </div>
                    <hr className='mt-5' />
                    <div className="botoningresar">
                      <Link className="btn-registro  text-decoration-none text-center mt-1" to="/registroUsuario">Registrarme</Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Ingreso;