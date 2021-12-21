import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import { AuthContext } from "../../context/auth.context"
import { login } from './../../services/auth.service'

function LoginForm({ fireFinalActions }) {

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })

    const { username, password } = loginForm

    const { logInUser } = useContext(AuthContext)

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({ ...loginForm, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        const credentials = { username, password }

        login(credentials)
            .then(res => {
                console.log("JWT token", res.data)
                logInUser(res.data.authToken);
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" name="username" value={username} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" value={password} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Iniciar sesión</Button>

        </Form>
    )
}

export default LoginForm