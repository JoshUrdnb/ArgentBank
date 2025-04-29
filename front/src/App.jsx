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

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile())
    }
  }, [token, dispatch])

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