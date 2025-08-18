import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthProvider from './components/AuthProvider';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import InboxPage from './pages/InboxPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import AnalyticsPage from './pages/AnalyticsPage';

const AppContent: React.FC = () => {
  const { auth, showLogin } = useAuth();
  const [currentPage, setCurrentPage] = useState('inbox');

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return showLogin ? <LoginPage /> : <RegisterPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'inbox':
        return <InboxPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <InboxPage />;
    }
  };

  // Mock unread alerts count
  const unreadAlertsCount = 2;

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage}
      unreadAlerts={unreadAlertsCount}
    >
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;