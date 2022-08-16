import React, { useRef, useState, useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { validateNombreDueño, validateNombreMascota, validateRaza, validateVeterinario, validateHorario, validateFecha } from "../../../../helpers/ValidateFields";
import "../../../../../Styles/GeneralStyles.css";
import "./CrearTurno.css";
import Time from "../Time";

const CrearTurno = ({ DBT, getTurno }) => {
  const [nombreDueño, setNombreDueño] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [raza, setRaza] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");

  const navigate = useNavigate()
  const handleClick = () => {

  }

  const [turnos, setTurnos] = useState([]);
  const [horas, setHoras] = useState([]);
  const [horasVeta, setHorasVeta] = useState([]);
  const [horasVetb, setHorasVetb] = useState([]);

  const horarioRef = useRef();
  const vetaRef = useRef();
  const vetbRef = useRef();
  const veterinarioRef = useRef();

  const timePicker = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const veta = "Dr Perez Ramiro";
  const vetb = "Dr Romero Pablo";

  useEffect(() => {
    horarioRef.current.disabled = true;
    veterinarioRef.current.disabled = true;
  }, []);

  useEffect(async () => {
    try {
      const res = await fetch(DBT);
      const resultado = await res.json();
      setTurnos(resultado);
    } catch (error) {
      console.error(error);
    }
  }, []);

  function handleDateChange(e) {
    const busquedaFechas = turnos.filter((fechas) => fechas.fecha === e.target.value
    );
    const buscarVeterinario = busquedaFechas.filter((doc) => doc.veterinario === veta);
    const buscarVeterinario1 = buscarVeterinario.map((horas) => horas.horario);
    setHorasVeta(buscarVeterinario1);
    const buscarVeterinarioI = busquedaFechas.filter((doc) => doc.veterinario === vetb);
    const buscarVeterinario2 = buscarVeterinarioI.map((horas) => horas.horario);
    setHorasVetb(buscarVeterinario2);
    if (buscarVeterinario.length >= 9) {
      vetaRef.current.disabled = true;
    } else {
      vetaRef.current.disabled = false;
    }
    if (buscarVeterinarioI.length >= 9) {
      vetbRef.current.disabled = true;
    } else {
      vetbRef.current.disabled = false;
    }

    veterinarioRef.current.disabled = false;
  }

  const handleVetChange = (e) => {

    if (e.target.value === veta) {

      const vet1filtrado = timePicker.filter((hora) => !horasVeta.includes(hora))
      setHoras(vet1filtrado);
    } else if (e.target.value === vetb) {
      const vet2filtrado = timePicker.filter((hora) => !horasVetb.includes(hora))
      setHoras(vet2filtrado);
    }

    horarioRef.current.disabled = false;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validateNombreDueño(nombreDueño) ||
      !validateNombreMascota(nombreMascota) ||
      !validateRaza(raza) ||
      !validateFecha(fecha) ||
      !validateHorario(horario) ||
      !validateVeterinario(veterinario)
    ) {
      Swal.fire("Ops!", " Datos incorrectos .", "error");
      return;
    }
    const newTurno = {
      nombreDueño,
      nombreMascota,
      raza,
      fecha,
      horario,
      veterinario
    }

    Swal.fire({
      title: 'Seguro que eliges este turno?',
      text: "No podras elegir otro !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reservado',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(DBT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTurno)
          });
          if (res.status === 201) {
            Swal.fire('Turno Guardado!', ' Tu turno fue reservado .', 'success');
            getTurno();
            navigate("/turno/tabla");
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div  >
      <Container className="py-5 DatosTurno">
        <h1>Elegir Turno para una Consulta </h1>
        <hr />
          <Form className="p-3 m-3" onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre Completo del Dueño</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre Completo"
                    onChange={({ target }) => setNombreDueño(target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nombre de la Mascota </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre o Apodo"
                    onChange={({ target }) => setNombreMascota(target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Tipo de Especie</Form.Label>
                  <Form.Select onChange={({ target }) => setRaza(target.value)} >
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
                  <Form.Label>Dia del turno</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Escoje el dia del turno"
                    onChange={({ target }) => setFecha(target.value)}
                    min="2022-06-01"
                    onBlur={handleDateChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label> Elegir Veterinario</Form.Label>
                  <Form.Select
                    onChange={({ target }) => setVeterinario(target.value)}
                    onBlur={handleVetChange}
                    ref={veterinarioRef} >
                    <option value="">Veterinario</option>
                    <option
                      ref={vetaRef}
                      value="Dr Perez Ramiro">Dr Perez, Ramiro</option>
                    <option
                      ref={vetbRef}
                      value="Dr Romero Pablo">Dr Romero, Pablo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label> Hora del turno</Form.Label>
                  <Form.Select
                    ref={horarioRef}
                    onChange={({ target }) => setHorario(target.value)}
                  >
                    <option value='seleccione'  >Seleccione una opcion</option>
                    {horas.map((hora, index) => {
                      return <Time hora={hora} key={index} />;
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end">
              <button className="btn-reservar"
                onClick={handleClick}>Reservar</button>
            </div>
          </Form> 
        <div className="text-end">
          <Link to="/turno/tabla/" className="btn-reservar text-decoration-none text-center">  Atras  </Link>
        </div>
      </Container >
    </div >
  );
};

export default CrearTurno;