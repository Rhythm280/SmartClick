import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';

// Layout components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import AddEventPage from './pages/events/AddEventPage';
import GalleryPage from './pages/gallery/GalleryPage';
import TaggingPage from './pages/gallery/TaggingPage';
import EditingPage from './pages/editing/EditingPage';
import FaceRecognitionPage from './pages/sharing/FaceRecognitionPage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  // Apply dark/light mode to the document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
          } />

          {/* Protected routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events/add" element={<AddEventPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/tagging" element={<TaggingPage />} />
            <Route path="/editing/:imageId" element={<EditingPage />} />
            <Route path="/sharing/face-recognition" element={<FaceRecognitionPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Redirect to login if no route matches */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;