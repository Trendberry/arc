import React from 'react'
import { shallow } from 'enzyme'
import TableRow from './TableRow'

it('renders children when passed in', () => {
  const wrapper = shallow(<TableRow>test</TableRow>)
  expect(wrapper.contains('test')).toBe(true)
})

it('renders props when passed in', () => {
  const wrapper = shallow(<TableRow id="foo" />)
  expect(wrapper.find({ id: 'foo' }).length).toBeGreaterThan(0)
})

it('renders styles when passed in', () => {
  const wrapper = shallow(<TableRow style={{ color: 'black' }} />)
  expect(typeof wrapper.prop('style')).toBe('object')
  expect(wrapper.prop('style').color).toBe('black')
})

it('renders different style when prop filled is passed in', () => {
  const wrapper = shallow(<TableRow />)
  const style = wrapper.prop('style')
  wrapper.setProps({ filled: true })
  expect(wrapper.prop('style')).not.toEqual(style)
})
