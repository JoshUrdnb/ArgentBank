import { Link } from 'react-router-dom'
import './header.scss'
import Logo from '../../assets/argentBankLogo.png'

export default function Header() {
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
            </Link>
            <div>
                <Link to="/sign-in" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            </div>
        </nav>
    )
}