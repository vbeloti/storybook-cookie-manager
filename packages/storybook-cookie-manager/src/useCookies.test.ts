/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react'
import Cookies from 'js-cookie'
import { useParameter } from 'storybook/manager-api'
import { useCookies } from './useCookies'
import { useRefresh } from './useRefresh'

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}))

jest.mock('storybook/manager-api', () => ({
  useParameter: jest.fn(),
}))

jest.mock('./useRefresh', () => ({
  useRefresh: jest.fn(),
}))

const mockUseParameter = useParameter as jest.Mock
const mockUseRefresh = useRefresh as jest.Mock
const mockCookiesGet = Cookies.get as jest.Mock
const mockCookiesSet = Cookies.set as jest.Mock
const mockCookiesRemove = Cookies.remove as jest.Mock
const mockRefreshPreview = jest.fn()

describe('useCookies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseParameter.mockReturnValue({})
    mockUseRefresh.mockReturnValue(mockRefreshPreview)
  })

  it('should initialize with cookies from js-cookie', () => {
    const initialCookies = { testCookie: 'testValue' }
    mockCookiesGet.mockReturnValue(initialCookies)
    const { result } = renderHook(() => useCookies())
    expect(result.current.cookies).toEqual(initialCookies)
  })

  it('should handle adding a new cookie', () => {
    mockCookiesGet.mockReturnValue({})
    const { result } = renderHook(() => useCookies())

    act(() => {
      result.current.setNewCookieName('newCookie')
      result.current.setNewCookieValue('newValue')
    })

    act(() => {
      result.current.handleAddCookie({ preventDefault: jest.fn() } as any)
    })

    expect(mockCookiesSet).toHaveBeenCalledWith('newCookie', 'newValue')
    expect(result.current.cookies).toEqual({ newCookie: 'newValue' })
    expect(result.current.newCookieName).toBe('')
    expect(result.current.newCookieValue).toBe('')
    expect(mockRefreshPreview).toHaveBeenCalled()
  })

  it('should not add a cookie if name is empty', () => {
    mockCookiesGet.mockReturnValue({})
    const { result } = renderHook(() => useCookies())

    act(() => {
      result.current.handleAddCookie({ preventDefault: jest.fn() } as any)
    })

    expect(mockCookiesSet).not.toHaveBeenCalled()
    expect(mockRefreshPreview).not.toHaveBeenCalled()
  })

  it('should handle editing a cookie', () => {
    const initialCookies = { testCookie: 'initialValue' }
    mockCookiesGet.mockReturnValue(initialCookies)
    const { result } = renderHook(() => useCookies())

    act(() => {
      result.current.handleEditCookie('testCookie', 'updatedValue')
    })

    expect(mockCookiesSet).toHaveBeenCalledWith('testCookie', 'updatedValue')
    expect(result.current.cookies).toEqual({ testCookie: 'updatedValue' })
    expect(mockRefreshPreview).toHaveBeenCalled()
  })

  it('should handle deleting a cookie', () => {
    const initialCookies = { testCookie: 'testValue', another: 'one' }
    mockCookiesGet.mockReturnValue(initialCookies)
    const { result } = renderHook(() => useCookies())

    act(() => {
      result.current.handleDeleteCookie('testCookie')
    })

    expect(mockCookiesRemove).toHaveBeenCalledWith('testCookie')
    expect(result.current.cookies).toEqual({ another: 'one' })
    expect(mockRefreshPreview).toHaveBeenCalled()
  })

  it('should handle clearing all cookies', () => {
    const initialCookies = { c1: 'v1', c2: 'v2' }
    mockCookiesGet.mockReturnValue(initialCookies)
    const { result } = renderHook(() => useCookies())

    act(() => {
      result.current.handleClearCookies({ preventDefault: jest.fn() } as any)
    })

    expect(mockCookiesRemove).toHaveBeenCalledWith('c1')
    expect(mockCookiesRemove).toHaveBeenCalledWith('c2')
    expect(result.current.cookies).toEqual({})
    expect(mockRefreshPreview).toHaveBeenCalled()
  })

  it('should update cookies from storybook parameters', () => {
    mockCookiesGet.mockReturnValue({ existing: 'value' })
    mockUseParameter.mockReturnValue({ newParam: 'newValue', existing: 'updatedValue' })

    const { result } = renderHook(() => useCookies())

    expect(mockCookiesSet).toHaveBeenCalledWith('newParam', 'newValue')
    expect(mockCookiesSet).toHaveBeenCalledWith('existing', 'updatedValue')
    expect(result.current.cookies).toEqual({ existing: 'updatedValue', newParam: 'newValue' })
  })

  it('should not update if params are the sam', () => {
    const initialCookies = { cookie1: 'value1' }
    mockCookiesGet.mockReturnValue(initialCookies)
    mockUseParameter.mockReturnValue({ cookie1: 'value1' })

    renderHook(() => useCookies())

    expect(mockCookiesSet).not.toHaveBeenCalled()
  })
})
