import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isUserSignIn: false,
    user: null,
    token: null, // Le token JWT stocké ici
}

const authSlice = createSlice({
    name: 'auth', // Le nom de mon slice
    initialState,
    reducers: { // Ici je définis les fonctions signIn et signOut, qui sont des reducers.
        signIn: (state, action) => {
            state.isUserSignIn = true
            state.user = action.payload.user
            state.token = action.payload.token // Ceci est une action
        },
        signOut: (state) => {
            state.isUserSignIn = false
            state.user = null
            state.token = null
        }
    }
})

// Export des actions
export const { signIn, signOut } = authSlice.actions

// Export du reducer
export default authSlice.reducer