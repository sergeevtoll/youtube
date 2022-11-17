import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuth } from 'store/auth'

const dataStorage = 'userStorage'

interface Ihook {
  login: (id: string) => void
  logout: () => void
  userId: string
}

export const UseAuth = (): Ihook => {
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('')

  const login = useCallback((id: string) => {
    localStorage.setItem(dataStorage, JSON.stringify({ userId: id }))
    setUserId(id)
    dispatch(setAuth(true))
  }, [])

  const logout = () => {
    setUserId('')
    localStorage.removeItem(dataStorage)
    dispatch(setAuth(false))
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(dataStorage))

    if (data && data.userId) {
      login(data.userId)
    }
  }, [login])

  return { userId, login, logout }
}
