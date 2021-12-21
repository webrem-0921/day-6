import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { AuthContext } from '../../context/auth.context'

function ProfilePage() {

    const { user } = useContext(AuthContext)

    return (
        <Container>
            <h1>¡Hola {user.username}! Bienvenido a tu perfil</h1>
        </Container>
    )
}

export default ProfilePage