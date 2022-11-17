import { HYDRATE } from 'next-redux-wrapper'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '../types'

const initialState: Auth = {
  auth: false,
}

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuth: (state: Auth, action: PayloadAction<boolean>) => {
      state.auth = action.payload

      return state
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer
