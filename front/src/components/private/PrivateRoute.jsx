import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const { token, user } = useSelector((state) => state.user.token)

    // Si pas de token, on redirige vers /login
    if (!token || !user) {
        return <Navigate to="/login" replace />
    }

    // Sinon on affiche le composant enfant
    return children
}