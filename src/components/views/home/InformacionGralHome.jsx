import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../style/home.css";

const InformacionGralHome = () => {
  return (
    <div>
      <Container>
        <Row className="container">
          <Col sm={12} md={4}>
            <h2 className="informacion-text-color text-center my-5">
              Tu Clinica Veterinaria de confianza en Tucuman
            </h2>
          </Col>
          <Col sm={12} md={8} className="text-center lead my-5 text-black">
            <p>
              En Clínica Veterinaria Rolling, tu centro veterinario de confianza
              en Tucuman, contamos con el mejor equipo tanto humano como técnico
              para proporcionarle a tu mascota una atención veterinaria de la
              máxima calidad.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InformacionGralHome;
