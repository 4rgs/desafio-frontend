import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Resultados from "../resultados/resultados";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Buscador() {
  const [productos, setProductos] = useState();
  const [productosReales, setProductosReales] = useState();
  const [query, setQuery] = useState("");
  const { register, handleSubmit } = useForm({ defaultValues: query });
  const [buscando, setBuscando] = useState(false);
  const [pageNumber, setPageNumber] = useState(1)
  const [totalProds, setTotalProds] = useState(1)
  const prodPerPage = 10;
  const pagesVisited = pageNumber * prodPerPage;
  const pageCount = Math.ceil(totalProds / prodPerPage)

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  const config = useRef({
    method: "get",
    url: process.env.REACT_APP_API+"/api/productos/busqueda?page="+pageNumber
  });


  useEffect(() => {
    const raiz = () => {
      return {
        method: "get",
        url: process.env.REACT_APP_API+"/api/productos/busqueda?page="+pageNumber
      };
    };
    const scopeBusqueda = (query) => {
      return {
        method: "get",
        url: process.env.REACT_APP_API+"/api/productos/busqueda?query="+query+"&page="+pageNumber
      };
    };
    if (query !== "" && buscando) {
      config.current = scopeBusqueda(query);
    } else {
      config.current = raiz();
    }
    axios(config.current)
      .then(function (response) {
        console.log(response.data)
        if (response.data.length === 0)
          alert("No se encontro el producto en base a tu criteria");
        setProductos(response.data.dsc);
        setProductosReales(response.data.data)
        setTotalProds(response.data.total)
      })
      .catch(function (error) {
        alert("Criterio de busqueda de minimo 3 caracteres");
      });
  }, [query, buscando, pageNumber]);
  return (
    <>
      <nav className="bg-blue-500 border-gray-200 px-2 sm:px-4 py-3 rounded">
        <div className="flex flex-wrap justify-between items-center mx-auto text-white">
          <p className="hidden md:block">Desafio Front End</p>
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
              className="absolute h-15 w-2/4 top-1 md:left-1/4 left-0 text-center p-2 pl-10 text-gray-900 bg-gray-50 rounded-full border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
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
      {productos && productosReales && <Resultados productos={productos} productosReales={productosReales}/>}
      <div className="text-center">
        <ReactPaginate 
          previousLabel={<svg id="atras" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          <div className="paginateReady"></div>
        </svg>}
          nextLabel={<svg id="siguiente" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="flex inline-flex p-2 m-2 rounded-md shadow-sm -space-x-px"
          previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          nextLinkClassName={"relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"}
          disabledClassName="page-item disabled"
          breakClassName="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-gay-500 text-sm font-medium hover:bg-gray-50"
          activeClassName="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-blue-400 text-white text-sm font-medium hover:bg-gray-50"
          pageClassName="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-gray-500 text-sm font-medium hover:bg-gray-50"
        />
      </div>
    </>
  );
}

export default Buscador;
