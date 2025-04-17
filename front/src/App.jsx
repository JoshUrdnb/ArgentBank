import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from '../src/components/private/PrivateRoute.jsx'
import Layout from "./layout/Layout.jsx"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/login/Login.jsx"
import Profile from "./pages/profile/Profile.jsx"

function App() {
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