import React from 'react'
import { shallow } from 'enzyme'
import Counter from './Counter'

function setup(value = 0) {
  const actions = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn()
  }
  const component = shallow(
    <Counter value={value} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    buttons: component.find('button'),
    div: component.find('div')
  }
}

describe('Counter component', () => {
  it('should display count', () => {
    const { div } = setup()
    expect(div.text()).toMatch(/^Clicked: 0 times/)
  })

  it('first button increments +1', () => {
    const { buttons, actions } = setup()
    buttons.at(0).simulate('click')
    expect(actions.onIncrement).toBeCalled()
  })

  it('second button decrements -1', () => {
    const { buttons, actions } = setup()
    buttons.at(1).simulate('click')
    expect(actions.onDecrement).toBeCalled()
  })

  it('third button should not increment if even integer', () => {
    const { buttons, actions } = setup(42)
    buttons.at(2).simulate('click')
    expect(actions.onIncrement).not.toBeCalled()
  })

  it('third button should increment if odd integer', () => {
    const { buttons, actions } = setup(41)
    buttons.at(2).simulate('click')
    expect(actions.onIncrement).toBeCalled()
  })

  it('fourth button should call onIncrement in a second', (done) => {
    const { buttons, actions } = setup()
    buttons.at(3).simulate('click')
    setTimeout(() => {
      expect(actions.onIncrement).toBeCalled()
      done()
    }, 1000)
  })
})
