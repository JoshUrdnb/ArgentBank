import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout.jsx"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/login/Login.jsx"
import Profile from "./pages/profile/Profile.jsx"
// import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App