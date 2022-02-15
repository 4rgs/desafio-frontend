import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Resultados from "../resultados/resultados";
import axios from "axios";

function Buscador() {
  const [productos, setProductos] = useState();
  const [query, setQuery] = useState("");
  const { register, handleSubmit } = useForm({ defaultValues: query });
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    document.title = "Desafio Frontend";
    var config;
    const raiz = () => {
      return {
        method: "get",
        url: "http://localhost:9000/productos/busqueda",
        headers: {
          "Content-Type": "application/json",
        },
      };
    };
    const scopeBusqueda = (data) => {
      return {
        method: "post",
        url: "http://localhost:9000/productos/busqueda",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    };
    if (query !== "" && buscando) {
      const data = JSON.stringify({
        query: query,
      });
      config = scopeBusqueda(data);
    } else {
      config = raiz();
    }

    axios(config)
      .then(function (response) {
        if (response.data.length === 0)
          alert("No se encontro el producto en base a tu criteria");
        setProductos(response.data);
      })
      .catch(function (error) {
        alert("Criterio de busqueda de minimo 3 caracteres");
      });
  }, [query, buscando]);
  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-3 rounded dark:bg-blue-800">
        <div className="flex flex-wrap justify-between items-center mx-auto text-white">
          <p className="hidden lg:block">Desafio Front End</p>
          <form
            method="GET"
            onSubmit={handleSubmit((data) => {
              setQuery(data.query);
              setBuscando(true);
            })}
          >
            <input
              id="busqueda"
              {...register("query")}
              className="flex absolute inset-y-1 left-0 lg:left-1/4 p-2 pl-10 w-2/4 text-gray-900 bg-gray-50 rounded-full border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Buscar productos"
            />
            <button type="submit" id="boton-buscar" value="" className="hidden">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <p>Productos</p>
        </div>
      </nav>
      {productos && <Resultados productos={productos} />}
    </>
  );
}

export default Buscador;
