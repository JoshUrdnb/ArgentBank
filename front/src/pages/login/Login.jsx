import { useState } from 'react' // Pour le formulaire
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, getUserProfile } from '../../store/user/userSlice.jsx'
import './login.scss'

export const Login = () => {
    // states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // redux states
    const {loading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        let userCredentials = {
            email,
            password
        }
        await dispatch(loginUser(userCredentials)).then( async (result) => {
            if (result.payload) {
                await dispatch(getUserProfile())
                setEmail('')
                setPassword('')
                navigate('/profile')
            }
        })        
    }

    return (
        <div className='bg-dark'>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
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
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        {loading?'Loading...':'Sign In'}
                    </button>
                    {error && (
                        <div className="error-message" role='alert'>{error}</div>
                    )}
                </form>
            </section>
        </div>
    )
}

export default Login