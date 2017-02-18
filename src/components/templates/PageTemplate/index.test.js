import React from 'react'
import { mount, shallow } from 'enzyme'
import PageTemplate from '.'

const wrap = (props = {}) => shallow(
  <PageTemplate {...props}>test</PageTemplate>
)

it('mounts', () => {
  mount(<PageTemplate>test</PageTemplate>)
})

it('renders children when passed in', () => {
  const wrapper = wrap()
  expect(wrapper.contains('test')).toBe(true)
})

it('renders header', () => {
  const wrapper = wrap()
  expect(wrapper.contains('header')).toBe(true)
})

it('renders hero', () => {
  const wrapper = wrap({ hero: 'hero' })
  expect(wrapper.contains('hero')).toBe(true)
})

it('renders footer', () => {
  const wrapper = wrap()
  expect(wrapper.contains('footer')).toBe(true)
})
