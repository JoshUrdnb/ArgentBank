import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout.jsx"
import Home from "./pages/home/Home.jsx"
import Sign from "./pages/sign-in/Sign.jsx"
import User from "./pages/user/User.jsx"
// import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="sign-in" element={<Sign />} />
                <Route path="user" element={<User />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App