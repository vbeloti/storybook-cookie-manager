/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Panel } from './Panel'
import { useCookies } from './useCookies'

jest.mock('./useCookies', () => ({
  useCookies: jest.fn(),
}))

jest.mock('storybook/internal/components', () => {
  const Form = ({ children }: { children: React.ReactNode }) => <form>{children}</form>
  Form.Field = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
  Form.Input = (props: any) => <input {...props} />
  return {
    AddonPanel: ({ active, children }: { active: boolean; children: React.ReactNode }) =>
      active ? <div>{children}</div> : null,
    Button: ({ children, ...props }: { children: React.ReactNode }) => <button {...props}>{children}</button>,
    Form,
    Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  }
})

const mockUseCookies = useCookies as jest.Mock

describe('Panel', () => {
  const mockHandleAddCookie = jest.fn()
  const mockHandleEditCookie = jest.fn()
  const mockHandleDeleteCookie = jest.fn()
  const mockHandleClearCookies = jest.fn()
  const mockSetNewCookieName = jest.fn()
  const mockSetNewCookieValue = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCookies.mockReturnValue({
      cookies: { testCookie: 'testValue' },
      newCookieName: 'newName',
      setNewCookieName: mockSetNewCookieName,
      newCookieValue: 'newValue',
      setNewCookieValue: mockSetNewCookieValue,
      handleAddCookie: mockHandleAddCookie,
      handleEditCookie: mockHandleEditCookie,
      handleDeleteCookie: mockHandleDeleteCookie,
      handleClearCookies: mockHandleClearCookies,
    })
  })

  it('should not render when not active', () => {
    const { container } = render(<Panel active={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render correctly when active', () => {
    render(<Panel active />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Value')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByText('testCookie')).toBeInTheDocument()
    expect(screen.getByDisplayValue('testValue')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByDisplayValue('newName')).toBeInTheDocument()
    expect(screen.getByDisplayValue('newValue')).toBeInTheDocument()
    expect(screen.getByText('Clear All Cookies')).toBeInTheDocument()
    expect(screen.getByText('Add Cookie')).toBeInTheDocument()
  })

  it('should call setNewCookieName on name input change', () => {
    render(<Panel active />)
    const nameInput = screen.getByDisplayValue('newName')
    fireEvent.change(nameInput, { target: { value: 'new-name' } })
    expect(mockSetNewCookieName).toHaveBeenCalledWith('new-name')
  })

  it('should call setNewCookieValue on value input change', () => {
    render(<Panel active />)
    const valueInput = screen.getByDisplayValue('newValue')
    fireEvent.change(valueInput, { target: { value: 'new-value' } })
    expect(mockSetNewCookieValue).toHaveBeenCalledWith('new-value')
  })

  it('should call handleEditCookie on cookie value change', () => {
    render(<Panel active />)
    const cookieValueInput = screen.getByDisplayValue('testValue')
    fireEvent.change(cookieValueInput, { target: { value: 'updatedValue' } })
    expect(mockHandleEditCookie).toHaveBeenCalledWith('testCookie', 'updatedValue')
  })

  it('should call handleDeleteCookie on delete button click', () => {
    render(<Panel active />)
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    expect(mockHandleDeleteCookie).toHaveBeenCalledWith('testCookie')
  })

  it('should call handleClearCookies on clear all button click', () => {
    render(<Panel active />)
    const clearButton = screen.getByText('Clear All Cookies')
    fireEvent.click(clearButton)
    expect(mockHandleClearCookies).toHaveBeenCalled()
  })

  it('should call handleAddCookie on add button click', () => {
    render(<Panel active />)
    const addButton = screen.getByText('Add Cookie')
    fireEvent.click(addButton)
    expect(mockHandleAddCookie).toHaveBeenCalled()
  })
})
