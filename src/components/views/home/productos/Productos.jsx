import React, {useState, useEffect} from "react";
import CardProducto from "./CardProducto";
import "../home.css";

const Productos = () => {
    const [productos, setProductos] = useState(null);

    const DBP = process.env.REACT_APP_API_PRODUCTOS;
  
    useEffect(() => {
      getProductos();
    }, [])
    
    const getProductos = async () => {
       try{
          const res = await fetch(DBP)
          const productosApi = await res.json()
          setProductos(productosApi)
      } catch (error) {
        console.error(error);
      }
  }
  
    return (
      <div className="container margin-components">
          <h1 className="text-center display-4 fw-bold mt-5">Productos para tus mascotas</h1>
          <div>
        <div className="row ">
          {productos && productos.map((el, i) => {
            return(
              <div key={i} className="col-lg-4 col-md-12 col-sm-12 my-3 text-center d-flex justify-content-center aling-items-center">
                <CardProducto imagen={el.productoImg} nombre={el.productoTitle} precio={el.productoPrecio}></CardProducto>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    );
  };
  
  export default Productos;
  