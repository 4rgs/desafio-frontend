import React, { useEffect, useState } from 'react';
import './resultados.css';
import axios from 'axios'


function Resultados({productos}) {
  const [productosReales,setProductosReales] = useState()
  const [buscando,setBuscando] = useState(false)
  
  const esDescuento = (producto) => {
    return productosReales.find(elem => elem.id === producto.id && elem.price === producto.price*2)
  }
  const renderProds = async () => {
    return !productos ? <h3>cargando...</h3> :
            productos.map((producto,index)=> {
              return  <div key={producto.id} className="card">
                  <div  className="container">
                  {esDescuento(producto)&&<span>Descuento</span>}
                  <h2>Producto {producto.id}</h2>
                  <img src={'https://'+producto.image} alt={producto.image} className="img"/>
                  <h4>Marca: {producto.brand}</h4>
                  <h4><b>Precio: {producto.price}</b></h4>
                  <p>Descripcion: {producto.description}</p>
                  </div>
                  </div>
            } 
          )
  }

  useEffect(()=>{
    const getProductosReales = async () => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/productos',
        headers: { 
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        setProductosReales(response.data)
      })
      .catch(function (error) {
        console.log(error.message)
      })
    }
    if(!productosReales)
      getProductosReales()
    if(!productos)
      setBuscando(true)
    return () => setBuscando(false)
  },
  // eslint-disable-next-line
  [buscando])

  return (
    <>
    <div className="album">
        {!productosReales ? <h3>cargando...</h3>:  
          renderProds(productos)}
    </div>
    </>
   
  );
}

export default Resultados;
