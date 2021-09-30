import { render, screen } from '@testing-library/react'
import Components from './Components'

test('render Components', () => {
  render(<Components />)
  const title = screen.getByTestId('components-container')
  expect(title).toBeInTheDocument()
})

test('render Title', () => {
  render(<Components />)
  const select = screen.getByTestId('title')
  expect(select).toBeInTheDocument()
})
