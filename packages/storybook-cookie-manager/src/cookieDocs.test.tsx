import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CookieDocs } from './CookieDocs'

jest.mock('@storybook/addon-docs/blocks', () => ({
  Subtitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  Source: ({ code }: { code: string }) => <pre>{code}</pre>,
}))

jest.mock('./styles', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
}))

const MOCK_COOKIE_DATA = [
  {
    name: 'theme_preference',
    description: "Store the user's theme preference.",
    example: 'dark',
  },
  {
    name: 'session_id',
    description: "Unique identifier for the user's session.",
    example: 'abc-123-def-456',
  },
] as const

describe('CookieDocs', () => {
  it('should render nothing when "of" prop is empty', () => {
    const { container } = render(<CookieDocs of={{}} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render nothing when "cookieDocs" parameter is not an array', () => {
    const { container } = render(<CookieDocs of={{ parameters: {} }} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render nothing when "cookieDocs" array is empty', () => {
    const { container } = render(<CookieDocs of={{ parameters: { cookieDocs: [] } }} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render the subtitle and table when cookie data is provided', () => {
    render(<CookieDocs of={{ parameters: { cookieDocs: [MOCK_COOKIE_DATA[0]] } }} />)
    expect(screen.getByRole('heading', { name: /🍪 Cookies/i })).toBeInTheDocument()

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /description/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /example value/i })).toBeInTheDocument()
  })

  it('should render one row in the table body for each cookie in the data', () => {
    render(<CookieDocs of={{ parameters: { cookieDocs: MOCK_COOKIE_DATA } }} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)

    expect(screen.getByText('theme_preference')).toBeInTheDocument()
    expect(screen.getByText('session_id')).toBeInTheDocument()
  })

  it('should display the correct name, description, and example for a cookie', () => {
    const singleCookie = MOCK_COOKIE_DATA[0]
    render(<CookieDocs of={{ parameters: { cookieDocs: [singleCookie] } }} />)

    const row = screen.getByText(singleCookie.name).closest('tr')

    expect(row).not.toBeNull()
    if (row) {
      expect(within(row).getByText(singleCookie.name)).toBeInTheDocument()
      expect(within(row).getByText(singleCookie.description)).toBeInTheDocument()
      expect(within(row).getByText(singleCookie.example)).toBeInTheDocument()
    }
  })

  it('should render the cookie name inside a <code> tag', () => {
    const singleCookie = MOCK_COOKIE_DATA[0]
    render(<CookieDocs of={{ parameters: { cookieDocs: [singleCookie] } }} />)

    const nameCell = screen.getByText(singleCookie.name)
    expect(nameCell.tagName).toBe('CODE')
  })
})
