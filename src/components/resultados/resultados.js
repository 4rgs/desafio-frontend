import React from 'react';
import './resultados.css';


function Resultados({productos}) {
  
  return (
    <>
      <div className="album">
        {!productos ? <h3>cargando...</h3> :
          productos.map((producto,index)=> {
            return <div className="card">
                      <div className="container">
                          <h2>Producto {producto.id}</h2>
                          <img src={'https://'+producto.image} alt={producto.image} className="img"/>
                          <h4><b>Marca: {producto.brand}</b></h4>
                          <h4><b>Precio: {producto.price}</b></h4>
                          <p>Descripcion: {producto.description}</p>
                      </div>
                  </div>
          })
        }
      </div>
    </>
  );
}

export default Resultados;
