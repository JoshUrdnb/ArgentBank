import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile } from "../src/store/user/userSlice.jsx"
import PrivateRoute from '../src/components/private/PrivateRoute.jsx'
import Layout from "./layout/Layout.jsx"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/login/Login.jsx"
import Profile from "./pages/profile/Profile.jsx"

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.user) // Optionnel: pour éviter des appels si user est déjà chargé

  useEffect(() => {
    // Si un token existe ET que les données utilisateur ne sont pas encore chargées (pour éviter des appels répétés)
    if (token && !user) { // MODIFICATION : Ajout de '!user' (facultatif mais bonne pratique)
      // console.log('App.jsx: Token trouvé, dispatch de getUserProfile avec token:', token)
      dispatch(getUserProfile(token)) // MODIFICATION ICI : Passer le token en argument
    }
  }, [token, user, dispatch]) // MODIFICATION : Ajout de 'user' aux dépendances si utilisé

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App