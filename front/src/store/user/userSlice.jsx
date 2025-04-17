// On importe createSlice, qui permet de créer un morceau de state Redux (un "slice") avec ses actions et son reducer inclus.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import hostName from '../../data/config.jsx'

export const loginUser = createAsyncThunk(
    'user/login',
    async (userCredentials) => {
        const request = await axios.post(`${hostName}/api/v1/user/login`, userCredentials)
        const response = await request.data.body
        localStorage.setItem('user', JSON.stringify(response))
        return response
    }
)

const userSlice = createSlice({
    name: 'user', // Le nom de mon slice (a le meme nom que le state dans le store mais ne le gere pas, on nomme le slice avec le meme nom par convention, pas par obligation.)
    initialState: {  // L'état initial du slice
        loading: null,
        user: null,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                console.log(action.payload)
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Email or password is incorrect'
                } else {
                    state.error = action.error.message
                }
            })
    }
})

// Export du reducer (C’est le reducer que je connecte dans store.js)
export default userSlice.reducer
// Export vers Header
export const { logout } = userSlice.actions