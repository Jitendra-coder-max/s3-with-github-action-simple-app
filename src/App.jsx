import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import KornferryDashboard from './KornFerryDashboard.jsx'
import IntegrationGrid from './components/IntegrationGrid.jsx'
import LoginPage from './components/LoginPage.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import { useAuth } from './auth/useAuth.js'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><KornferryDashboard /></ProtectedRoute>} />
          <Route
            path="/participant-integration-grid/:cohortKey/:userKey/:mmManifestId"
            element={<ProtectedRoute><IntegrationGrid /></ProtectedRoute>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
