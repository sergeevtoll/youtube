import { API_URL, AUTH_URL } from 'config/urls'
import axios from './query'

interface GetLogin {
  login: string
  password: string
}

export enum FORM {
  LOGIN = 'login',
  PASSWORD = 'password',
}

export type FORM_DATA = {
  [FORM.LOGIN]: string
  [FORM.PASSWORD]: string
}

export const getLogin = async (req?: FORM_DATA) => {
  const { password: reqPassword, login: reqLogin } = req || {}

  if (!reqPassword || !reqLogin) return undefined

  const {
    data: { password: resPassword, login: resLogin },
  } = await axios.get<GetLogin>(AUTH_URL)
  console.log(reqPassword === resPassword && reqLogin === resLogin)

  if (reqPassword === resPassword && reqLogin === resLogin) return 'token'

  return undefined
}
