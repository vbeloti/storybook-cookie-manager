import { renderHook } from '@testing-library/react'
import { addons } from 'storybook/internal/manager-api'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { useRefresh } from './useRefresh'

jest.mock('storybook/internal/manager-api', () => ({
  addons: {
    getChannel: jest.fn(),
  },
}))

jest.mock('storybook/internal/core-events', () => ({
  FORCE_RE_RENDER: 'forceReRender',
}))

describe('useRefresh', () => {
  it('should return a function that emits FORCE_RE_RENDER event', () => {
    const emit = jest.fn()
    ;(addons.getChannel as jest.Mock).mockReturnValue({ emit })

    const { result } = renderHook(() => useRefresh())
    result.current()

    expect(emit).toHaveBeenCalledWith(FORCE_RE_RENDER)
  })
})
