import React,{ useState ,useEffect } from 'react';
import { useForm } from "react-hook-form";
import './buscador.css';
import Resultados from '../resultados/resultados';
import axios from 'axios'


function Buscador() {
  const [productos,setProductos] = useState()
  const [query,setQuery] = useState('')
  const {register,handleSubmit} = useForm({defaultValues:query})
  const [buscando,setBuscando] = useState(false)
  var config

  const raiz =  () => {
    return {
      method: 'get',
      url: 'http://localhost:9000/productos/busqueda',
      headers: { 
        'Content-Type': 'application/json'
      }
    } 
  }
  const scopeBusqueda =(data) => {      
    return  {
      method: 'post',
        url: 'http://localhost:9000/productos/busqueda',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }
  }
  
  useEffect(() => {
    if(query !== '' && buscando){
      const data = JSON.stringify({
        "brand": query
      });
      config = scopeBusqueda(data)
    }
    else{
      config = raiz()
    }
    axios(config)
      .then(function (response) {
        if((response.data.length === 0)){
          const data = JSON.stringify({
            "description": query
          });
          config = scopeBusqueda(data)
          axios(config)
          .then(function (response) {
            if((response.data.length === 0)){
              const data = JSON.stringify({
                "id": query
              });
              config = scopeBusqueda(data)
              axios(config)
              .then(function (response) {
                if(!(response.data.length === 0)) setProductos(response.data)
              })
              .catch(function (error) {
                throw error.message
              });
            }else{
              setProductos(response.data)
            }
          })
          .catch(function (error) {
            throw error.message
          });
        }else{
          setProductos(response.data)
        }
      })
      .catch(function (error) {
        throw error.message
      });
  },[query,buscando])
  return (
    <>
        <div className="topnav">
            <p>Desafio Front End</p>
            <form method='GET' onSubmit={handleSubmit((data) => {setQuery(data.query); setBuscando(true); })}>
              <input id="busqueda" {...register('query',{minLength: {value:3,message : "minimo 3 caracteres para hacer una busqueda"}})} type="text" placeholder="Buscar productos"/>
              <button type='submit' id='boton-buscar' className='hidden'></button>
            </form>
            <p>Productos</p>
        </div> 
        {!productos ? 
          <h3>cargando...</h3> 
        :
          <Resultados productos={productos} />
        }
    </>
  );
}

export default Buscador;
