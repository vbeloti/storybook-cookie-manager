import React from 'react'
import { StyledButton } from './button.styles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content of the button.
   */
  children: React.ReactNode
  /**
   * The variant of the button, which determines its style.
   */
  variant?: 'primary' | 'secondary'
  /**
   * The size of the button, which affects its padding and font size.
   * Defaults to 'medium'.
   */
  size?: 'small' | 'medium' | 'large'
}

/**
 * A customizable button component that supports different styles and sizes.
 */
export const Button = ({ children, variant = 'primary', size = 'medium', ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  )
}
