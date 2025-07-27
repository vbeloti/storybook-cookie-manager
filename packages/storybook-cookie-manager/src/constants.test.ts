import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants'

describe('constants', () => {
  it('should have the correct ADDON_ID', () => {
    expect(ADDON_ID).toBe('storybook/cookie-manager')
  })

  it('should have the correct PANEL_ID', () => {
    expect(PANEL_ID).toBe('storybook/cookie-manager/panel')
  })

  it('should have the correct PARAM_KEY', () => {
    expect(PARAM_KEY).toBe('cookies')
  })
})
