import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Ingreso from './components/views/Login/Ingreso/Ingreso';
import TablaTurnos from './components/views/Formularios/Turnos/TablaTurnos/TablaTurnos';
import CrearTurno from './components/views/Formularios/Turnos/CrearTurno/CrearTurno';
import EditarTurno from './components/views/Formularios/Turnos/EditarTurno/EditarTurno';
import TablaUsuario from './components/views/Formularios/Usuarios/TablaUsuario/TablaUsuario';
import CrearUsuario from './components/views/Formularios/Usuarios/CrearUsuario/CrearUsuario';
import EditarUsuario from './components/views/Formularios/Usuarios/EditarUsuario/EditarUsuario';
import Home from "./components/views/home/Home";
import PaginaPlanes from "./components/views/PaginasPlanes/PaginaPlanes";
import PaginaContacto from "./components/views/Formularios/PaginaContacto/PaginaContacto";
import Pagina404 from './components/views/Pag404/Pagina404';
import SobreNosotros from './components/views/SobreNosotros/SobreNosotros';
import PagAdmin from './components/views/PaginaAdmin/PagAdmin';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ServiciosTabbed from './components/views/entradas/ServiciosTabbed';
import PlanesTabbed from './components/views/entradas/PlanesTabbed';



function App() {

  const [turnos, setTurnos] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const DBT = process.env.REACT_APP_API_TURNOS;
  const DBU = process.env.REACT_APP_API_USUARIO;

  useEffect(() => {
    getTurno();
    getUsuario();
  }, [])

  const getTurno = async () => {
    try {
      const res = await fetch(DBT);
      const turnoApi = await res.json();
      setTurnos(turnoApi);
    } catch (error) {
      console.log(error);
    }
  }

  const getUsuario = async () => {
    try {
      const res = await fetch(DBU);
      const usuarioApi = await res.json();
      setUsuario(usuarioApi);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='Contenedorglobal'>
      <BrowserRouter>
        <Navigation />
        <main>
          <Routes>
            <Route exact path="/" element={<Home turnos={turnos} />} />
            <Route exact path="/turno/tabla" element={<TablaTurnos turnos={turnos} DBT={DBT} getTurno={getTurno} />} />
            <Route exact path="/turno/crear/" element={<CrearTurno DBT={DBT} getTurno={getTurno} />} />
            <Route exact path="/turno/editar/:id" element={<EditarTurno DBT={DBT} getTurno={getTurno} />} />
            <Route exact path="/usuario/crear/" element={<CrearUsuario DBU={DBU} getUsuario={getUsuario} />} />
            <Route exact path="/usuario/tabla/" element={<TablaUsuario DBU={DBU} getUsuario={getUsuario} usuario={usuario} />} />
            <Route exact path="/usuario/editar/:id" element={<EditarUsuario DBU={DBU} getUsuario={getUsuario} />} />
            <Route exact path="/login/" element={<Ingreso />} />
            <Route exact path="/PaginaPlanes/" element={<PaginaPlanes />} />
            <Route exact path="/PaginaContacto/" element={<PaginaContacto />} />
            <Route exact path="/SobreNosotros/" element={<SobreNosotros />} />
            <Route exact path="*" element={<Pagina404 />} />
            <Route exact path="/PagAdmin/" element={<PagAdmin />} />
            <Route exact path="/ServiciosTabbed" element={<ServiciosTabbed></ServiciosTabbed>}></Route>
            <Route exact path="/PlanesTabbed" element={<PlanesTabbed></PlanesTabbed>}></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
};

export default App;
