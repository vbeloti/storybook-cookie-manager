import React from 'react'
import { Source, Subtitle, type Of } from '@storybook/addon-docs/blocks'
import { Table } from './styles'

interface CookieInfo {
  name: string
  description: string
  example?: string
}

interface CookieDocsProps {
  of: Of
}

export const CookieDocs = ({ of }: CookieDocsProps) => {
  const cookieDocs = of?.parameters?.cookieDocs as CookieInfo[] | undefined

  if (!cookieDocs || cookieDocs.length === 0) {
    return null
  }

  return (
    <>
      <Subtitle>🍪 Cookies</Subtitle>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Example Value</th>
          </tr>
        </thead>
        <tbody>
          {cookieDocs.map(({ name, description, example }) => (
            <tr key={name}>
              <td>
                <code>{name}</code>
              </td>
              <td>{description}</td>
              <td>
                <Source code={example} language="json" format={false} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
