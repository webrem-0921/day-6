import axios from 'axios'

const authService = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`
})

export function signup(credentials) {
    return authService.post('/signup', credentials)
}

export function login(credentials) {
    return authService.post('/login', credentials)
}

export function verify(token) {
    return authService.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
}