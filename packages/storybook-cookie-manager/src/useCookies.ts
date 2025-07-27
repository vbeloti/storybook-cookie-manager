import { useState, useEffect, useCallback } from 'react'
import { useParameter } from 'storybook/manager-api'
import Cookies from 'js-cookie'
import { PARAM_KEY } from './constants'
import { useRefresh } from './useRefresh'

interface UseCookiesReturn {
  cookies: Record<string, string>
  newCookieName: string
  setNewCookieName: React.Dispatch<React.SetStateAction<string>>
  newCookieValue: string
  setNewCookieValue: React.Dispatch<React.SetStateAction<string>>
  handleAddCookie: (e: React.SyntheticEvent) => void
  handleEditCookie: (name: string, value: string) => void
  handleDeleteCookie: (name: string) => void
  handleClearCookies: (e: React.SyntheticEvent) => void
}

export const useCookies = (): UseCookiesReturn => {
  const [cookies, setCookies] = useState<Record<string, string>>(() => Cookies.get())
  const [newCookieName, setNewCookieName] = useState('')
  const [newCookieValue, setNewCookieValue] = useState('')
  const params = useParameter(PARAM_KEY, {})
  const refreshPreview = useRefresh()

  const updateCookiesAndRefresh = useCallback(
    (newCookies: Record<string, string>) => {
      setCookies(newCookies)
      refreshPreview()
    },
    [refreshPreview],
  )

  const handleAddCookie = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!newCookieName) {
      return
    }
    Cookies.set(newCookieName, newCookieValue)
    updateCookiesAndRefresh({ ...cookies, [newCookieName]: newCookieValue })
    setNewCookieName('')
    setNewCookieValue('')
  }

  const handleEditCookie = (name: string, value: string) => {
    Cookies.set(name, value)
    updateCookiesAndRefresh({ ...cookies, [name]: value })
  }

  const handleDeleteCookie = (name: string) => {
    Cookies.remove(name)
    const newCookies = { ...cookies }
    delete newCookies[name]
    updateCookiesAndRefresh(newCookies)
  }

  const handleClearCookies = (e: React.SyntheticEvent) => {
    e.preventDefault()
    Object.keys(cookies).forEach((name) => {
      Cookies.remove(name)
    })
    updateCookiesAndRefresh({})
  }

  useEffect(() => {
    const newCookiesFromParams = { ...cookies }
    let hasChanged = false

    Object.entries(params).forEach(([name, value]) => {
      const stringValue = String(value)
      if (cookies[name] !== stringValue) {
        Cookies.set(name, stringValue)
        newCookiesFromParams[name] = stringValue
        hasChanged = true
      }
    })

    if (hasChanged) {
      setCookies(newCookiesFromParams)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return {
    cookies,
    newCookieName,
    setNewCookieName,
    newCookieValue,
    setNewCookieValue,
    handleAddCookie,
    handleEditCookie,
    handleDeleteCookie,
    handleClearCookies,
  }
}
