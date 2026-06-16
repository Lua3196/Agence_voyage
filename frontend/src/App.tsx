import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth-context';

// Pages publiques / auth
import Welcome from './pages/welcome';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Description from './pages/voyages/description';

// Pages protégées
import Dashboard from './pages/dashboard';
import VoyagesIndex from './pages/voyages/index';
import VoyagesCreate from './pages/voyages/create';
import HomeClient from './pages/client/home-client';
import AddDestination from './pages/admin/create-destination';

// Guard : redirige vers /login si pas connecté
function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Guard : redirige vers dashboard/index si déjà connecté
function GuestRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, role } = useAuth();
    if (!isAuthenticated) return <>{children}</>;
    return <Navigate to={role === 'admin' ? '/dashboard' : '/index'} replace />;
}

function App() {
    return (
        <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<Welcome />} />
            <Route path="/description" element={<Description />} />

            {/* Auth */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            {/* Admin */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/voyages" element={<PrivateRoute><VoyagesIndex /></PrivateRoute>} />
            <Route path="/voyages/create" element={<PrivateRoute><VoyagesCreate /></PrivateRoute>} />
             <Route path="/destinations/create" element={<PrivateRoute><AddDestination /></PrivateRoute>} />

            {/* Client */}
            <Route path="/index" element={<PrivateRoute><HomeClient /></PrivateRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
