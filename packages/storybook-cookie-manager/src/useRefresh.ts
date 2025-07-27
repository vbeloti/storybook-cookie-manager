import { addons } from 'storybook/internal/manager-api'
import { FORCE_RE_RENDER } from 'storybook/internal/core-events'
import { useCallback } from 'react'

export const useRefresh = () => {
  const channel = addons.getChannel()

  const refreshPreview = useCallback(() => {
    channel.emit(FORCE_RE_RENDER)
  }, [channel])

  return refreshPreview
}
