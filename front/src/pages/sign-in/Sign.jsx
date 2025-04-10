import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../store/auth/authSlice.jsx'
import { loginAPI } from '../../data/fetchApi.jsx'
import { getProfile } from '../../data/fetchApi.jsx'
import './sign.scss'

export default function Sign() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch() // Dispatch me permet de déclancher l'action présent dans authSlice.
    const navigate = useNavigate() // Navigate me permet d'aller vers la page /user si le login est réussi.

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = await loginAPI({ email, password }) // Deux states
            const profile = await getProfile(token)

            dispatch(signIn({
                user: profile,
                token
            }))

            navigate('/user')
        } catch (err) {
            console.error(err)
            alert('Échec de la connexion : ' + err.message)
        }
    }

    return ( // Placer le formulaire dans un composant :
        <div className='bg-dark'>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </div>
    )
}