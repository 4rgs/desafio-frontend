import React, { useEffect, useState } from 'react';
import './resultados.css';
import axios from 'axios'


function Resultados({productos}) {
  const [productosReales,setProductosReales] = useState()
  const getProductosReales = () => {
    var config = {
      method: 'get',
      url: 'http://localhost:9000/productos',
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    
    axios(config)
    .then(function (response) {
      setProductosReales(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(()=>{
    if(!productosReales) getProductosReales();
  },[])
  return (
      <div className="album">
        {!productos ? <h3>cargando...</h3> :
          productos.map((producto,index)=> {
            return <div className="card">
                      <div className="container">
                          <h2>Producto {producto.id}</h2>
                          <img src={'https://'+producto.image} alt={producto.image} className="img"/>
                          
                          <h4>Marca: {producto.brand}</h4>
                          <h4><b>Precio: {producto.price}</b></h4>
                          <p>Descripcion: {producto.description}</p>
                      </div>
                  </div>
          })
        }
      </div>
  );
}

export default Resultados;
