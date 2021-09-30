import { render, screen } from '@testing-library/react'
import { Component } from 'react'
import Select from './Select'

const fakeData = ['A', 'B', 'C']

test('Select render', () => {
  render(<Select data={fakeData} />)
  const select = screen.getByTestId('select1')
  expect(select).toBeInTheDocument()
})
