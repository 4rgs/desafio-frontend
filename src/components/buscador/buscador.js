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
  
  useEffect(() => {
    document.title = "Desafio Frontend"
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
    if(query !== '' && buscando){
      const data = JSON.stringify({
        "query": query
      });
      config = scopeBusqueda(data)
    }
    else{
      config = raiz()
    }
    
    axios(config)
    .then(function (response) {
      setProductos(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
    
  },[query,buscando])
  return (
    <div>
        <div className="topnav">
            <p>Desafio Front End</p>
            <form method='GET' onSubmit={handleSubmit((data) => {setQuery(data.query); setBuscando(true); })}>
              <input id="busqueda" {...register('query')} type="text" placeholder="Buscar productos"/>
              <button type='submit' id='boton-buscar' value="" className='hidden'></button>
            </form>
            <p>Productos</p>
        </div> 
        {!productos ? 
          <h3>cargando...</h3> 
        :
          <Resultados productos={productos} />
        }
    </div>
  );
}

export default Buscador;
