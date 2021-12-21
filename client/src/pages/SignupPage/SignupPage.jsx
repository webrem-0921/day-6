import { Container, Row, Col } from 'react-bootstrap'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageContext } from "../../context/userMessage.context"
import SignupForm from '../../components/SignupForm/SignupForm'

function SignupPage() {

    const { setMessageInfo, setShowMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const fireFinalActions = () => {
        setMessageInfo({ title: 'Registro completado', desc: 'Tu registro en la plataforma se ha realizado correctamente' })
        setShowMessage(true)
        navigate('/iniciar-sesion')
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1>Registro de usuario</h1>
                    <hr />
                    <SignupForm fireFinalActions={fireFinalActions} />
                </Col>
            </Row>
        </Container>
    )
}

export default SignupPage