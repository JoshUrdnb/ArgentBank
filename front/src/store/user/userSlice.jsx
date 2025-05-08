import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import hostName from '../../data/config.jsx'

// LOGIN
export const loginUser = createAsyncThunk(
    'user/login',
    async (userCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${hostName}/api/v1/user/login`, userCredentials)
            return response.data.body.token
        } catch (error) {
            if (error.response && error.response.status === 503) {
                return rejectWithValue('Service temporairement indisponible. Veuillez réessayer plus tard.')
            }
            return rejectWithValue('Données de connexion invalides')
        }
    }
)

// GET PROFILE
export const getUserProfile = createAsyncThunk(
    'user/profile',
    async (_, { rejectWithValue }) => {
        try {
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
        } catch (error) {
            if (error.response && error.response.status === 503) {
                return rejectWithValue('Service temporairement indisponible. Veuillez réessayer plus tard.')
            }
            return rejectWithValue('Échec de la récupération du profil utilisateur.')
        }
    }
)

// UPDATE PROFILE
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ firstName, lastName }, { rejectWithValue }) => {
        try {
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
        } catch (error) {
            if (error.response && error.response.status === 503) {
                return rejectWithValue('Service temporairement indisponible. Veuillez réessayer plus tard.')
            }
            return rejectWithValue('Échec de la mise à jour du profil.')
        }
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
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Erreur lors de la connexion'
            })

            // GET PROFILE
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Échec de la récupération du profil utilisateur.'
            })

            // UPDATE PROFILE
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.error = null
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Échec de la mise à jour du profil.'
            })
    },
})

export const { logout } = userSlice.actions
export default userSlice.reducer