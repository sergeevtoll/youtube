import { HYDRATE } from 'next-redux-wrapper'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Favourites, FAVOURIT_DATA } from '../types'
import { findIndex } from 'lodash'

const initialState: Favourites = {
  list: [],
}

const favouritsSlice = createSlice({
  name: 'Favourites',
  initialState,
  reducers: {
    addFavourite: (state: Favourites, action: PayloadAction<FAVOURIT_DATA>) => {
      state.list.push(action.payload)

      return state
    },
    updateFavourite: (state: Favourites, action: PayloadAction<FAVOURIT_DATA>) => {
      const index = findIndex(state.list, { id: action.payload.id })
      state.list.splice(index, 1, action.payload)
      console.log(index, state.list)

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

export const { addFavourite, updateFavourite } = favouritsSlice.actions
export default favouritsSlice.reducer
