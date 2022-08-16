import React, {useState, useEffect} from "react";
import "./home.css"


const Clima = () => {
    const [clima, setClima] = useState("");

  useEffect(() => {
    getClima();
  }, [])
  
  const getClima = async () => {
     try{
        const res = await fetch("https://ws.smn.gob.ar/map_items/weather")
        const climaApi = await res.json()
        const climaTucu = climaApi.filter(el => el.name === "San Miguel de Tucumán")
        setClima(climaTucu[0].weather.temp)
    } catch (error) {
        console.error(error);
    }
}
    return (
        <div className="container my-5">
            <p className="display-5 lead"> Tiempo en San Miguel de Tucumán {clima}°C</p>
        </div>
    );
};

export default Clima;