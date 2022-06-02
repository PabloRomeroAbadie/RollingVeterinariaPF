import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardProducto = ({imagen, nombre, precio}) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img className="img-fluid" variant="top" src={imagen}></Card.Img>
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>Precio: {precio} </Card.Text>
          <Link to="*" className="btn-reservar text-decoration-none text-center">Comprar</Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProducto;