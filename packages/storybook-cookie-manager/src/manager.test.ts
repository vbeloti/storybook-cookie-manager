import { addons, types } from 'storybook/manager-api'
import { ADDON_ID, PANEL_ID } from './constants'
import { Panel } from './Panel'

jest.mock('storybook/manager-api', () => ({
  addons: {
    register: jest.fn(),
    add: jest.fn(),
  },
  types: {
    PANEL: 'panel',
  },
}))

const mockAddons = addons as jest.Mocked<typeof addons>

describe('manager', () => {
  it('should register the addon and add the panel', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('./manager')

    expect(mockAddons.register).toHaveBeenCalledWith(ADDON_ID, expect.any(Function))

    const registerCallback = mockAddons.register.mock.calls?.[0]?.[1]
    const mockApi = {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerCallback?.(mockApi as any)

    expect(mockAddons.add).toHaveBeenCalledWith(PANEL_ID, {
      type: types.PANEL,
      title: '🍪 Cookies',
      render: Panel,
    })
  })
})
