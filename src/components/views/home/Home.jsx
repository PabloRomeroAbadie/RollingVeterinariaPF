import React from 'react';
import Portada from './Portada';
import InformacionGralHome from './InformacionGralHome';
import Publicidad from './Publicidad';
import Productos from './productos/Productos';
import Planes from './planes/Planes';
import Servicio from "./servicios/Servicio"
import Opiniones from './Opiniones';

const Home = () => {
    return (
        <div>
            <Portada></Portada>
            <div className='bg-dark'>
            <main className='container'>
            <InformacionGralHome></InformacionGralHome>
            <Publicidad></Publicidad>
            <Productos></Productos>
            <Planes></Planes>
            <Servicio></Servicio>
            <Opiniones></Opiniones>
            </main>
            </div>
        </div>
    );
};

export default Home;