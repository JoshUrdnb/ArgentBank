import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/user/userSlice'
import './header.scss'
import Logo from '../../assets/argentBankLogo.png'

export default function Header() {
    const user = useSelector((state) => state.user.user)
    // console.log('user dans le Header :', user)
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
            <div>
                {user ? (
                    <>
                        <Link to="/profile" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </Link>

                        <button className="main-nav-item log-out-button" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}