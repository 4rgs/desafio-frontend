import React from 'react'
import Buscador from './components/buscador/buscador'
import Resultados from './components/resultados/resultados'
import { mount } from 'enzyme'
import { shallow } from 'enzyme'
import Productos from '../utils/testProducts'
const busqueda = [{
        query:181
      },{
        query:"adda"
      },{
        query:"odrnuh ixdta"
      }
    ]

describe('Rendering components', () => {
  it("renderiza Buscador sin crashear", () => {
    const wrapper = shallow(<Buscador />);
  })
  it("renderiza Resultados sin crashear", () => {
    const wrapper = shallow(<Resultados productos={Productos}/>)
  })
  it("renderiza contenedor de Buscador sin crashear", () => {
    const wrapper = shallow(<Buscador/>)
    const container1 = (<p>Desafio Front End</p>) 
    const container2 = (<p>Productos</p>) 
    expect(wrapper.contains(container1)).toEqual(true)
    expect(wrapper.contains(container2)).toEqual(true)
  })
  it("renderiza contenedor de Resultados sin crashear", () => {
    const wrapper = shallow(<Resultados productos={Productos}/>)
    const container = ( <h3>cargando...</h3>) 
    expect(wrapper.contains(container)).toEqual(true)
  })
});

describe('Resultados Props', () => {
  const wrapper = mount(<Buscador query={busqueda}/>)
  it("accept props per ID",  () => {
    const formatoConId = busqueda[0]
    expect(wrapper.props().query[0]).toEqual(formatoConId)
  })
  it("accept props per Brand",() => {
    const formatoConBrand = busqueda[1]
    expect(wrapper.props().query[1]).toEqual(formatoConBrand)
  })
  it("accept props per Description",() => {
    const formatoConDescription = busqueda[2]
    expect(wrapper.props().query[2]).toEqual(formatoConDescription)
  })
})