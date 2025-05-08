import { useState } from 'react' // Pour le formulaire
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, getUserProfile } from '../../store/user/userSlice.jsx'
import './login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export const Login = () => {
    // states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    // redux states
    const { loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        let userCredentials = {
            email,
            password
        }
        await dispatch(loginUser(userCredentials)).then(async (result) => {
            if (result.payload) {
                const token = result.payload
                if (rememberMe) {
                    localStorage.setItem('token', token)
                } else {
                    sessionStorage.setItem('token', token)
                }
                await dispatch(getUserProfile()) // Appel API pour avoir les dernières infos
                navigate('/profile')
            }
        })
    }

    return (
        <div className='main bg-dark'>
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="error-message" role='alert'>{error}</div>
                    )}
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="error-message" role='alert'>{error}</div>
                    )}
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
            </section>
        </div>
    )
}

export default Login