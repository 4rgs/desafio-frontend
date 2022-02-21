import React from 'react'
import Resultados from './resultados'
import { mount , shallow } from 'enzyme'
import testProducts from '../..//../utils/testProducts'

describe('Rendering components', () => {
    it("renderiza Resultados sin crashear", () => {
      shallow(<Resultados productos={testProducts}/>)
    })
    it("renderiza contenedor de Resultados sin crashear", () => {
      const wrapper = shallow(<Resultados productos={testProducts}/>)
      const container = ( <h3>cargando...</h3>) 
      expect(wrapper.contains(container)).toEqual(true)
    })
  });
describe('testing Utils And functions',() => {
  const wrapper = mount(<Resultados productos={testProducts}/>)
  it('Paginate',async  () => {
      const container = ( <div className="paginateReady" /> )
      expect(wrapper.contains(container)).toEqual(true)
  })
  it('apply correctly a discount when needed', async () => {
    const response = Object.keys(wrapper.props().productos)
  })
})
