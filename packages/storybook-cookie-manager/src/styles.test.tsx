import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { Content, TableWrapper, ButtonWrapper, Label, Input, Table } from './styles'

jest.mock('storybook/internal/components', () => ({
  Form: {
    Field: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
    Input: ({ children }: { children: React.ReactNode }) => <input>{children}</input>,
  },
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  Button: ({ children, ...props }: { children: React.ReactNode }) => <button {...props}>{children}</button>,
}))

describe('styles', () => {
  it('should render Content correctly', () => {
    const { container } = render(<Content />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render TableWrapper correctly', () => {
    const { container } = render(<TableWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render ButtonWrapper correctly', () => {
    const { container } = render(<ButtonWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render Label correctly', () => {
    const { container } = render(<Label label="test" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render Input correctly', () => {
    const { container } = render(<Input />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render Table correctly', () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <td>test</td>
          </tr>
        </tbody>
      </Table>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
