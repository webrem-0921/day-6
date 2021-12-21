import { Route, Routes } from 'react-router-dom'
import CoastersListPage from '../pages/CoastersListPage/CoastersPage'
import CoasterDetailsPage from '../pages/CoasterDetailsPage/CoasterDetailsPage'
import IndexPage from '../pages/IndexPage/IndexPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

import PrivateRoute from './PrivateRoute'


function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/listado" element={<CoastersListPage />} />
            <Route path="/detalles/:coasterId" element={<CoasterDetailsPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />

            <Route path="/perfil" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<h1>Esto es un 404 :3</h1>} />
        </Routes>
    )
}

export default AppRoutes