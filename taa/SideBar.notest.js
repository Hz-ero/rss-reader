import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import SideBar from '../../src/components/SideBar/index.jsx'

const setup = () => {
  const props = {
    noReadNum_all: 10,
    noReadNum_ithome: 4,
    noReadNum_kr: 3,
    noReadNum_ifanr: 3,
    clickSwitchCategory: jest.fn(),
    clickUnPop: jest.fn()
  }

  const enzymeWrapper = mount(<SideBar {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('component: SideBar', () => {
  it.skip('shoule render header: 定悦', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('span').at(0).text()).toBe('定悦')
    expect(enzymeWrapper.find('.label').at(0).text()).toBe('10')
    expect(enzymeWrapper.find('.label').at(1).text()).toBe('3')
    expect(enzymeWrapper.find('.label').at(2).text()).toBe('4')
    expect(enzymeWrapper.find('.label').at(3).text()).toBe('3')
  })
})

describe('look snapshot', () => {
  it.skip('component: SideBar', () => {
    const props = {
      noReadNum_all: 10,
      noReadNum_ithome: 4,
      noReadNum_kr: 3,
      noReadNum_ifanr: 3,
      clickSwitchCategory: jest.fn(),
      clickUnPop: jest.fn()
    }
    const compSideBar = renderer.create(<SideBar {...props}/>)

    let tree = compSideBar.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
