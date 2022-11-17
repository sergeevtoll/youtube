import { useSelector } from 'react-redux'
import { State } from 'store/types'

export const useGetAuth = () => useSelector((state: State) => state.auth.auth)
