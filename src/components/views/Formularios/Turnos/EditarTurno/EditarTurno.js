import { useEffect, useRef, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { validateNombreDueño, validateNombreMascota, validateRaza, validateVeterinario, validateHorario, validateFecha } from "../../../../helpers/ValidateFields";
import "../../../../../Styles/GeneralStyles.css";
import "../CrearTurno/CrearTurno.css";
import Time from "../Time";

const EditarTurno = ({ DBT, getTurno }) => {
    const [turno, setTurno] = useState({});
    const [turnos, setTurnos] = useState([]);
    const [horas, setHoras] = useState([]);

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

    const { id } = useParams();

    const nombreDueñoRef = useRef("");
    const nombreMascotaRef = useRef("");
    const veterinarioRef = useRef("");
    const fechaRef = useRef(""); 
    const horarioRef = useRef(""); 
    const vetaRef = useRef("");
    const vetbRef = useRef("");

    const navigate = useNavigate()

    const veta = "Dr Ramiro Perez"; 
    const vetb = "Dr Romero Pablo";

    useEffect(async () => {
        try {
            const res = await fetch(`${DBT}/${id}`);
            const turnoApi = await res.json();
            setTurno(turnoApi);
            searchAtDb()
        } catch (error) {
            console.error(error);
        }
    }, []);

    const searchAtDb = (async () => {
        try {
            const res = await fetch(DBT);
            const resultado = await res.json()
            setTurnos(resultado);
            const busquedaFechas = turnos.filter(
                (fechas) => fechas.fecha === fechaRef.current.value);
            const buscarveterio = busquedaFechas.map((turnos) => turnos.veterinario);
            const filtradovet1 = buscarveterio.filter((buscada) => {
                return buscada === veta;
            });
            const filtradovet2 = buscarveterio.filter((buscado) => {
                return buscado === vetb;
            });

            if (filtradovet1.length >= 9) {
                vetaRef.current.disabled = true;
            } else if (filtradovet2.length >= 9) {
                vetbRef.current.disabled = true;
            }
            const buscarHoras = busquedaFechas.map((turno) => turno.horario);
            const filtradoHoras = timePicker.filter(
                (hora) => !buscarHoras.includes(hora)
            );
            setHoras(filtradoHoras);
        } catch (error) {
            console.error(error);
        }
    })

    const handleDateChange = (e) => {
        const busquedaFechas = turnos.filter(
            (fechas) => fechas.fecha === e.target.value
        );
        const buscarveterio = busquedaFechas.map((turno) => turno.veterinario);
        const filtradovet1 = buscarveterio.filter((buscada) => {
            return buscada === veta;
        });
        const filtradovet2 = buscarveterio.filter((buscado) => {
            return buscado === vetb;
        });
        if (filtradovet1.length >= 9) {
            vetaRef.current.disabled = true;
        } else if (filtradovet2.length >= 9) {
            vetbRef.current.disabled = true;
        }
        const buscarHoras = busquedaFechas.map((turno) => turno.horario);
        const filtradoHoras = timePicker.filter(
            (hora) => !buscarHoras.includes(hora)
        );
        setHoras(filtradoHoras);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (
            !validateNombreDueño(nombreDueñoRef.current.value) ||
            !validateNombreMascota(nombreMascotaRef.current.value) ||
            !validateRaza(turno.raza) ||
            !validateFecha(turno.fecha) ||
            !validateVeterinario(turno.veterinario) ||
            !validateHorario(turno.horario)
        ) {
            Swal.fire("Ops!", " Algun dato es incorrecto .", "error");
            return;
        }
        const turnoUpdated = {
            nombreDueño: nombreDueñoRef.current.value,
            nombreMascota: nombreMascotaRef.current.value,
            raza: turno.raza,
            fecha: turno.fecha,
            veterinario: turno.veterinario,
            horario: turno.horario
        };
        Swal.fire({
            title: 'Seguro que quieres cambiar el turno?',
            text: "No podras volver a cambiar !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Turno Cambiado',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${DBT}/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(turnoUpdated),
                    });
                    if (res.status === 200) {
                        Swal.fire('Modificado ', 'Su turno fue modificado con exito !!.', 'success');
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
        <div>
            <Container className="py-5">
                <h1>Editar Turno</h1>
                <hr />
                <Row>
                    <div className="d-flex justify-content-center">
                    <Col sm={12} md={8}>
                    <Form className="my-5" onSubmit={handleSubmit}>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Nombre Del Dueño</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nombre"
                                defaultValue={turno.nombreDueño}
                                ref={nombreDueñoRef} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre de la Mascota</Form.Label>
                            <Form.Control type="text"
                                placeholder="nombre o apodo"
                                defaultValue={turno.nombreMascota}
                                ref={nombreMascotaRef} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Raza</Form.Label>
                            <Form.Select
                                value={turno.raza}
                                onChange={({ target }) => setTurno({ ...turno, raza: target.value })}>
                                <option value="">Tipo de Raza</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="ave">Ave</option>
                                <option value="reptil">Reptil</option>
                                <option value="otro">Otro</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className='Rlabel'>Dia del turno</Form.Label>
                            <Form.Control
                                type="date"
                                value={turno.fecha}
                                onBlur={handleDateChange}
                                onChange={({ target }) => setTurno({ ...turno, fecha: target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Veterinario</Form.Label>
                            <Form.Select
                                value={turno.veterinario}
                                onChange={({ target }) => setTurno({ ...turno, veterinario: target.value })}>
                                <option value="">Elegir Veterinario</option>
                                <option
                                    ref={vetaRef}
                                    value="Dr Perez Ramiro">Dr Perez, Ramiro</option>
                                <option
                                    ref={vetbRef}
                                    value="Dr Romero Pablo">Dr Romero, Pablo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label> Hora del turno</Form.Label>
                            <Form.Select
                                value={turno.horario}
                                onChange={({ target }) => setTurno({ ...turno, horario: target.value })}>

                                <option value='seleccione'  >Seleccione una opcion</option>
                                {horas.map((hora, index) => {
                                    return <Time hora={hora} key={index} />;
                                })}
                            </Form.Select>
                        </Form.Group>
                        <div className="text-end">
                            <button className="btn-reservar">Modificar</button>
                        </div>
                    </Form>
                    </Col>
                    </div>
                    
                </Row>
                    
                <div className="text-end">
                    <Link to="/turno/tabla/" className="btn-reservar text-decoration-none text-center">  Atras  </Link>
                </div>
            </Container>
        </div>
    );
};

export default EditarTurno;