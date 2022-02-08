import React from 'react'
import Buscador from './components/buscador/buscador'
import Resultados from './components/resultados/resultados'
import { shallow, mount } from "enzyme"

const busqueda = {
  id:181
}
describe('rendering components', () => {
  it("renderiza Buscador sin crashear", () => {
    shallow(<Buscador/>)
  })
  it("renderiza Resultados sin crashear", () => {
    shallow(<Resultados/>)
  })
  it("renderiza contenedor de Buscador sin crashear", () => {
    const wrapper = shallow(<Buscador/>)
    const container = (<input id="busqueda" type="text" placeholder="Buscar productos"/>) 
    expect(wrapper.contains(container)).toEqual(true)
  })
  it("renderiza contenedor de Resultados sin crashear", () => {
    const wrapper = shallow(<Resultados/>)
    const container = ( <h3>cargando...</h3>) 
    expect(wrapper.contains(container)).toEqual(true)
  })
});

describe('Resultados Props', () => {
  const wrapper = mount(<Resultados query={busqueda}/>)
  it("accepts busqueda props",() => {
    expect(wrapper.props().query).toEqual(busqueda)
  })
})

describe('Funcionalidad', () =>{
  const wrapper = mount(<Buscador />)
  wrapper.find('#boton-buscar').simulate('click')
  it("clickear en el boton buscar - realiza la peticion de actualizar Resultados", () => {
    
  })
})