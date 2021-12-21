import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { MessageContext } from "../context/userMessage.context"
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from "../components/LoadingSpinner/LoadingSpinner"

function PrivateRoute() {

    const { isLoggedIn, isLoading } = useContext(AuthContext)
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    if (isLoading) {
        return <Spinner />
    }

    if (!isLoggedIn) {
        setShowMessage(true)
        setMessageInfo({ title: 'Desautorizado', desc: 'Inicia sesión para continuar' })
        return <Navigate to="/iniciar-sesion" />
    }

    return <Outlet />
}

export default PrivateRoute