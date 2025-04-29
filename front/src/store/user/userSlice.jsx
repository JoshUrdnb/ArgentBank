import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import hostName from '../../data/config.jsx'

// userSlice.jsx
export const loginUser = createAsyncThunk(
    'user/login',
    async (userCredentials) => {
        const response = await axios.post(`${hostName}/api/v1/user/login`, userCredentials)
        return response.data.body.token
    }
)

export const getUserProfile = createAsyncThunk(
    'user/profile',
    async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        const response = await axios.post(
            `${hostName}/api/v1/user/profile`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data.body
    }
)

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ firstName, lastName }) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        const response = await axios.put(
            `${hostName}/api/v1/user/profile`,
            { firstName, lastName },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data.body
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null,
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false
                state.error = 'Email or password is incorrect'
            })

            .addCase(getUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(getUserProfile.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to fetch user profile'
            })

            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(updateUserProfile.rejected, (state) => {
                state.loading = false
                state.error = 'Failed to update user profile'
            })
    },
})

export const { logout } = userSlice.actions
export default userSlice.reducer