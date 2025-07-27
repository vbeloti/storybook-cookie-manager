import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ButtonProps } from './button'
import Cookies from 'js-cookie'

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      description: 'Variantion of the button',
      table: {
        type: {
          summary: 'primary | secondary',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
      options: ['primary', 'secondary'],
      control: {
        type: 'select',
      },
    },
    size: {
      description: 'Size of the button',
      table: {
        type: {
          summary: 'small | medium | large',
        },
        defaultValue: {
          summary: 'medium',
        },
      },
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio',
      },
    },
    type: {
      description: 'Type of the button',
      table: {
        type: {
          summary: 'button | submit | reset',
        },
        defaultValue: {
          summary: 'button',
        },
      },
      options: ['button', 'submit', 'reset'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    type: 'button',
    children: 'Button',
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Hello',
    variant: 'primary',
    size: 'medium',
  },
}

const CookieButtonRenderer = (args: ButtonProps) => {
  const cookieVariant = (Cookies.get('button_variant') as ButtonProps['variant']) || 'primary'
  const cookieSize = (Cookies.get('button_size') as ButtonProps['size']) || 'medium'
  const cookieChildren = (Cookies.get('button_children') as ButtonProps['children']) || 'Hello from Cookies'

  return (
    <Button {...args} variant={cookieVariant} size={cookieSize}>
      {cookieChildren}
    </Button>
  )
}

export const ButtonWithCookies: Story = {
  render: CookieButtonRenderer,
  parameters: {
    cookies: {
      button_variant: 'primary',
      button_size: 'medium',
      button_children: 'Hello from Cookies',
    },
    cookieDocs: [
      {
        name: 'button_variant',
        description: 'Change the style of the button.',
        example: 'primary',
      },
      {
        name: 'button_size',
        description: 'Change the size of the button.',
        example: 'medium',
      },
      {
        name: 'button_children',
        description: 'Change the text of the button.',
        example: 'Hello from Cookies',
      },
    ],
  },
}
