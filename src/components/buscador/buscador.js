import React,{ useState ,useEffect } from 'react';
import { useForm } from "react-hook-form";
import './buscador.css';
import Resultados from '../resultados/resultados';
import axios from 'axios'


function Buscador() {
  const [productos,setProductos] = useState()
  const [query,setQuery] = useState('')
  const {register,handleSubmit,formState: { errors}} = useForm({
    defaultValues:productos
  })
  const [buscando,setBuscando] = useState(false)
  const fetchApi = async () => {
    var config = {
      method: 'get',
      url: 'http://localhost:9000/productos',
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    
    axios(config)
    .then(function (response) {
      setProductos(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  

  const updateProductos = async () => {
    var data = JSON.stringify({
      "brand": query
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:9000/productos/busqueda',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setProductos(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  
  useEffect(() => {
    if(query == '') fetchApi()
    else if(!buscando){
      updateProductos()
      setBuscando(false)
    } 
  },[query,productos])

  return (
    <>
        <div className="topnav">
            <button className="active" href="#GitFrontEND">Desafio Front End</button>
            <form method='GET' onSubmit={handleSubmit((data) => {setQuery(data.query); setBuscando(true); })}>
              <input id="busqueda" {...register('query',{minLength: {value:3,message : "minimo 3 caracteres para hacer una busqueda"}})} type="text" placeholder="Buscar productos"/>
              <button type='submit' id='boton-buscar' className='hidden'></button>
            </form>
            <button className="active" href="#getAllProductos">Productos</button>
        </div> 

        {!productos ? <h3>cargando...</h3> :
          <Resultados productos={productos} />
        }
    </>
  );
}

export default Buscador;
