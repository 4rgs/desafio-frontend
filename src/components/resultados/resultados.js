import React,{ useEffect } from "react";
import "./resultados.css";

function Resultados({ productos, config, productosReales}) {
  
  function esDescuento(producto) {
    return productosReales.find(
      (elem) => elem.id === producto.id && elem.price === producto.price * 2
    );
  }
  const renderProds = () => {
    return (
      productos && productos.map((producto, index) => {
        return (
          <div
            key={producto.id}
            className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 rounded-xl shadow-inner card"
          >
            <div className="w-auto rounded overflow-hidden shadow-lg">
              <img
                className="mx-auto h-48"
                src={"https://" + producto.image}
                alt={producto.id}
              />
              <div className="px-6 py-4 shadow-inner">
              <div className="text-lg mb-2">{producto.id}</div>
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
  useEffect(() => {

  }, [productos,productosReales]);
  return (
    <>
      <div className="album text-center ">
        {!productosReales ? <h3>cargando...</h3> : renderProds()}
        
      </div>
      
    </>
  );
}

export default Resultados;
