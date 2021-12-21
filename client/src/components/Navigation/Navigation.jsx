import { useContext } from 'react'
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import './Navigation.css'

function Navigation() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Link to="/" className='navbar-brand'>Coasters App</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav>
                        <Link to="/" className='nav-link'>Home</Link>
                        <Link to="/listado" className='nav-link'>Montañas rusas</Link>

                        {isLoggedIn ?
                            <>
                                <Link to="/perfil" className='nav-link'>{user?.username}</Link>
                                <NavLink as="span" onClick={logOutUser}>Cerrar sesión</NavLink>
                            </>
                            :
                            <>
                                <Link to="/iniciar-sesion" className='nav-link'>Iniciar sesión</Link>
                                <Link to="/registro" className='nav-link'>Registro</Link>
                            </>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation