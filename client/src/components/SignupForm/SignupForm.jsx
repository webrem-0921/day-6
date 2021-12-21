import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import { signup } from './../../services/auth.service'

function SignupForm({ fireFinalActions }) {

    const [signupForm, setSignupForm] = useState({
        username: "",
        password: ""
    })

    const { username, password } = signupForm

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupForm({ ...signupForm, [name]: value })
    }

    function handleSubmit(e) {

        e.preventDefault()

        const credentials = { username, password }

        signup(credentials)
            .then(() => fireFinalActions())
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

            <Button variant="dark" type="submit" style={{ width: '100%' }}>Acceder</Button>

        </Form>
    )
}

export default SignupForm