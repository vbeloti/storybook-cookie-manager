# 🚀 storybook-cookie-manager 🍪

<div align="center">
  <img src="https://raw.githubusercontent.com/vbeloti/storybook-cookie-manager/refs/heads/main/.github/storybook-cookie-manager.gif" alt="A video of the Storybook Cookie Manager showing how to edit cookies directly from the addon tab" />
</div>

[Storybook Cookie Manager Demo](https://storybook-cookie-manager.pages.dev)

Unlock seamless cookie management and documentation directly within your Storybook environment with **storybook-cookie-manager**. This powerful addon provides a dedicated panel to view, edit, and clear cookies, along with a `<CookieDocs />` component to automatically generate documentation for your components' cookie dependencies in MDX.

With **storybook-cookie-manager**, you can streamline your development workflow, improve component testing, and maintain crystal-clear documentation with minimal effort.

✅ **Compatible with Storybook 9+**

---

## Core Features

- 🍪 **Cookie Management Panel**: An integrated Storybook panel to add, edit, and clear cookies on the fly.
- 📚 **Automated Cookie Documentation**: Use the `<CookieDocs />` component in your `.mdx` files to display beautiful, automated documentation for the cookies your components rely on.

## Installation

First, install the addon using your preferred package manager:

```bash
npm install storybook-cookie-manager --save-dev
```

or

```bash
yarn add storybook-cookie-manager --dev
```

## Configuration

Next, register **storybook-cookie-manager** in your Storybook configuration file (`.storybook/main.js` or `.storybook/main.ts`).

```javascript
export default {
  addons: [
    // Other addons...
    getAbsolutePath('storybook-cookie-manager'),
  ],
}
```

## Usage

**storybook-cookie-manager** shines in two key areas: managing cookies during development and documenting them.

### 1. Managing Cookies in your Stories

To define cookies for a component, use the `parameters.cookies` property in your story file. This will populate the **storybook-cookie-manager** panel, allowing you to interact with the cookies.

Here’s an example of how to define cookies for a `Button` component:

```typescript
export const Button: Story = {
  parameters: {
    cookies: {
      user_preference: 'dark_mode',
      session_id: 'abc-123-xyz-456',
    },
    cookieDocs: [
      {
        name: 'user_preference',
        defaultValue: 'dark_mode',
        description: 'Stores the user theme preference.',
      },
      {
        name: 'session_id',
        defaultValue: 'abc-123-xyz-456',
        description: 'The unique identifier for the user session.',
      },
    ],
  },
}
```

### 2. Documenting Cookies with `<CookieDocs />`

For documentation pages (`.mdx`), **storybook-cookie-manager** provides a `<CookieDocs />` component that automatically pulls the cookie definitions from your stories and renders them in a clean, readable format.

Simply import `CookieDocs` from `storybook-cookie-manager` and point it to the story you want to document.

```mdx
import * as ButtonStories from './button.stories'
import { CookieDocs } from 'storybook-cookie-manager'

<CookieDocs of={ButtonStories.ButtonWithCookies} />
```

This will generate a table listing the `user_preference` and `session_id` cookies, including their names and descriptions, right on your documentation page.

---

## Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, please open an issue or submit a pull request.

## License

**storybook-cookie-manager** is licensed under the MIT License.
