import styled, { css } from 'styled-components'
import { ButtonProps } from './button'

type StyledButtonProps = Required<Pick<ButtonProps, 'variant' | 'size'>>

const theme = {
  primary: '#6A1B9A',
  secondary: '#F50057',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
}

const sizes = {
  small: css`
    font-size: 12px;
    padding: 8px 16px;
  `,
  medium: css`
    font-size: 14px;
    padding: 12px 24px;
  `,
  large: css`
    font-size: 16px;
    padding: 16px 32px;
  `,
}

const variants = {
  primary: css`
    background-color: ${theme.primary};
    color: ${theme.white};
    border: 2px solid ${theme.primary};

    &:hover:not(:disabled) {
      background-color: #4a148c; // Tom mais escuro de roxo
      border-color: #4a148c;
    }
  `,
  secondary: css`
    background-color: ${theme.white};
    color: ${theme.primary};
    border: 2px solid ${theme.primary};

    &:hover:not(:disabled) {
      background-color: ${theme.lightGray};
    }
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  transition: all 0.2s ease-in-out;
  border: none;

  &[data-story-block='true'] {
    outline: none !important;
  }

  ${({ size }) => sizes[size]}

  ${({ variant }) => variants[variant]}

  &:active:not(:disabled) {
    transform: scale(0.97);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) inset;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }
`
