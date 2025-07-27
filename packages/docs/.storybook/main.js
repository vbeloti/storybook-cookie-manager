import { dirname, join } from 'path'

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config = {
  stories: ['../stories/**/*.mdx', '../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('storybook-cookie-manager'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  core: {},
}

export default config
