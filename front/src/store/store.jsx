import { configureStore } from '@reduxjs/toolkit' // Import de la fonction configureStore depuis RTK.
import userReducer from './user/userSlice' // Import du reducer.

export const store = configureStore({ // On crée le store de Redux et on y déclare nos reducers.
    reducer: { // On passe tous les "slices" de notre état global.
        user: userReducer, // Le bout de state qui s’appelle auth, il sera géré par authReducer.
    },
})

// user devient le nom du morceau de state global.
// user = le nom du morceau de l’état global (ça donnera state.auth).
// userReducer = les logiques qui permettent de lire et modifier ce morceau.