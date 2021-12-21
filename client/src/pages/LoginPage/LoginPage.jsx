import { Container, Row, Col } from 'react-bootstrap'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageContext } from "../../context/userMessage.context"
import LoginForm from '../../components/LoginForm/LoginForm'

function LoginPage() {

    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    const navigate = useNavigate()

    const fireFinalActions = () => {
        setMessageInfo({ title: 'Sesión iniciada', desc: 'Te has identificado correctamente en la plataforma' })
        setShowMessage(true)
        navigate('/')
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1>Iniciar sesión</h1>
                    <hr />
                    <LoginForm fireFinalActions={fireFinalActions} />
                </Col>
            </Row>
        </Container>)
}

export default LoginPage