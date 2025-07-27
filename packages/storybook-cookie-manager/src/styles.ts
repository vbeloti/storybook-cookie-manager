import { styled } from 'storybook/theming'
import { Form, Table as SBTable } from 'storybook/internal/components'

export const Content = styled.div`
  padding: 16px;
`

export const TableWrapper = styled.div`
  margin-bottom: 16px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Label: React.ComponentType<any> = styled(Form.Field)`
  margin: 0;
`

export const Input = styled(Form.Input)`
  width: 100%;
`

export const Table = styled(SBTable)`
  width: 100%;
`
