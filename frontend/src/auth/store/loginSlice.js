import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = 'asdasda'
    },
    deleteToken: (state)=>{
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setToken,deleteToken } = loginSlice.actions

export default loginSlice.reducer;