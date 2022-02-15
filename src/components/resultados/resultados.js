import React, { useEffect, useState } from "react";
import "./resultados.css";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Resultados({ productos }) {
  const [productosReales, setProductosReales] = useState();
  const [buscando, setBuscando] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const prodPerPage = 10;
  const pagesVisited = pageNumber * prodPerPage;
  const pageCount = Math.ceil(productos.length / prodPerPage)
  const esDescuento = (producto) => {
    return productosReales.find(
      (elem) => elem.id === producto.id && elem.price === producto.price * 2
    );
  };
  const renderProds = () => {
    return (
      productos &&
      productos.slice(pagesVisited, pagesVisited + prodPerPage).map((producto, index) => {
        return (
          <div
            key={producto.id}
            className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 rounded-xl shadow-inner card"
          >
            <div className="w-auto rounded overflow-hidden shadow-lg">
              <img
                className="w-48 h-48 mx-auto shadow-inner"
                src={"https://" + producto.image}
                alt={producto.id}
              />
              <div className="px-6 py-4 shadow-inner">
                <div className="font-bold text-xl mb-2">{producto.brand}</div>
                <p className="text-gray-700 text-base">
                  {producto.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  ${producto.price}
                </span>
                {esDescuento(producto) && (
                  <span className="inline-block p-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded">
                    50%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })
    );
  };

  useEffect(
    () => {
      const getProductosReales = async () => {
        axios({
          method: "get",
          url: "http://localhost:9000/productos",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            setProductosReales(response.data);
          })
          .catch(function (error) {
            console.log(error.message);
          });
      };
      if (!productosReales) getProductosReales();
      if (!productos) setBuscando(true);
      return () => setBuscando(false);
    },
    // eslint-disable-next-line
    [buscando]
  );
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  return (
    <>
      <div className="album text-center ">
        {!productosReales ? <h3>cargando...</h3> : renderProds()}
        
      </div>
      <div className="text-center">
        <ReactPaginate 
          previousLabel={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>}
          nextLabel={<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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

export default Resultados;
