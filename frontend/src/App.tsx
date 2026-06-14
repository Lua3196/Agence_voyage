import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/auth-context';

// Pages publiques / auth
import Welcome from './pages/welcome';
import Login from './pages/auth/login';
import Register from './pages/auth/register';


// Pages protégées (nécessitent auth)
import Dashboard from './pages/dashboard';
import VoyagesIndex from './pages/voyages/index';
import VoyagesCreate from './pages/voyages/create';

// Guard : redirige vers /login si pas connecté
function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

// Guard : redirige vers /dashboard si déjà connecté
function GuestRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
}

function App() {
    return (
        <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<Welcome />} />

            {/* Pages auth — pas de sidebar */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            {/* Pages protégées — sidebar intégrée dans chaque page */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/voyages" element={<PrivateRoute><VoyagesIndex /></PrivateRoute>} />
            <Route path="/voyages/create" element={<PrivateRoute><VoyagesCreate /></PrivateRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
