import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/user/userSlice'
import './header.scss'
import Logo from '../../assets/argentBankLogo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
            </Link>
            <div className='main-nav-items-container'>
                {user ? (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <FontAwesomeIcon icon={faUserCircle} />
                            {user.firstName}
                        </Link>

                        <button className="main-nav-item log-out-button" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} />
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}