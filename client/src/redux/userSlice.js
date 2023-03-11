import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoginStart: (state, action) => {
      state.loading = true
    },
    LoginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    LoginFailure: (state, action) => {
      state.loading = false
      state.error = true
    },
    Logout: (state, action) =>{
        state.user= null
        state.loading= false
        state.error= false      
    }
  },
})

// Action creators are generated for each case reducer function
export const { LoginStart, LoginSucess, LoginFailure,Logout } = userSlice.actions

export default userSlice.reducer