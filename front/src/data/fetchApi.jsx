export async function loginAPI({ email, password }) {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return data.body.token // récupère uniquement le token
}

export async function getProfile(token) {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`// EX: Je suis le porteur de ce jeton. Autorise-moi à accéder à cette ressource.
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erreur récuparation des données')
    }

    return data.body // { firstName: '...', lastName: '...' }
}