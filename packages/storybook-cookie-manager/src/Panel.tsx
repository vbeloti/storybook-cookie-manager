import React, { type ChangeEvent, type JSX } from 'react'
import { AddonPanel, Button, Form } from 'storybook/internal/components'
import { useCookies } from './useCookies'
import { ButtonWrapper, Content, Input, Label, Table, TableWrapper } from './styles'

interface AddonPanelProps {
  readonly active?: boolean
}

export function Panel({ active = false }: AddonPanelProps): JSX.Element | null {
  const {
    cookies,
    newCookieName,
    setNewCookieName,
    newCookieValue,
    setNewCookieValue,
    handleAddCookie,
    handleEditCookie,
    handleDeleteCookie,
    handleClearCookies,
  } = useCookies()

  if (!active) {
    return null
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCookieName(e.target.value)
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCookieValue(e.target.value)
  }

  const handleEdit = (name: string, e: ChangeEvent<HTMLInputElement>) => {
    handleEditCookie(name, e.target.value)
  }

  return (
    <AddonPanel active={active}>
      <Content>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cookies).map(([name, value]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleEdit(name, e)
                      }}
                      type="text"
                      value={value}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        handleDeleteCookie(name)
                      }}
                      size="small"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Form>
          <Label label="Cookie Name">
            <Input onChange={handleNameChange} type="text" value={newCookieName} />
          </Label>
          <Label label="Cookie Value">
            <Input onChange={handleValueChange} type="text" value={newCookieValue} />
          </Label>
          <ButtonWrapper>
            <Button onClick={handleClearCookies} type="button" variant="ghost">
              Clear All Cookies
            </Button>
            <Button onClick={handleAddCookie} type="button">
              Add Cookie
            </Button>
          </ButtonWrapper>
        </Form>
      </Content>
    </AddonPanel>
  )
}

Panel.displayName = 'Panel'
