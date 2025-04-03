import "./layout.scss"
import { Outlet } from 'react-router-dom'
import Header from './header/Header.jsx'
import Footer from "./footer/Footer.jsx"

export default function Layout() {
    return (
        <div className="layout">
            <Header />
            <div className="layout-main">
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    )
}