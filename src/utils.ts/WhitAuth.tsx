import { LOGIN_URL, ROOT_URL } from 'config/route'
import { useGetAuth } from 'store/auth/hooks'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'

export const Auth: FC<{ children: ReactNode }> = ({ children }) => {
  const { asPath: pathname, push } = useRouter()
  const auth = useGetAuth()

  useEffect(() => {
    if (auth) {
      if (pathname === LOGIN_URL) {
        void push(ROOT_URL)
      }
    } else if (pathname !== LOGIN_URL) {
      void push(LOGIN_URL)
    }
  }, [pathname, auth, push])

  return <>{children}</>
}
