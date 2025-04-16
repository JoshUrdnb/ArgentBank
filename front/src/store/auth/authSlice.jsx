// On importe createSlice, qui permet de créer un morceau de state Redux (un "slice") avec ses actions et son reducer inclus.
import { createSlice } from '@reduxjs/toolkit' 

// C’est l’état initial du slice auth :
// isUserSignIn : indique si l’utilisateur est connecté
// user : les infos de l’utilisateur (ex : email, nom, etc.)
// token : le token JWT, utile pour les requêtes API sécurisées
const initialState = {
    isUserSignIn: false,
    user: null,
    token: null, // Le token JWT stocké ici
}

const authSlice = createSlice({
    name: 'auth', // Le nom de mon slice (a le meme nom que le state dans le store mais ne le gere pas, on nomme le slice avec le meme nom par convention, pas par obligation.)
    initialState, // L'état initial
    reducers: { // Ici je définis les fonctions signIn et signOut, qui sont des reducers. (Les reducers = fonctions qui modifient l’état).
        signIn: (state, action) => {
            state.isUserSignIn = true
            state.user = action.payload.user
            state.token = action.payload.token // Ceci est une action
        },
        signOut: (state) => { // remet tout à zéro
            state.isUserSignIn = false
            state.user = null
            state.token = null
        }
    }
})

// On exporte les actions pour pouvoir les utiliser ailleurs. Ex: dispatch(signIn({ user, token }))
export const { signIn, signOut } = authSlice.actions

// Export du reducer (C’est le reducer que je connecte dans store.js)
export default authSlice.reducer