import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UpdateJob from './pages/UpdateJob';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: '/',
                element: <Home /> 
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'edit/:id',
                element: <UpdateJob />
            }
        ]
    }
])

export default router;