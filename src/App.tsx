import React, { useState } from 'react';
import Layout from './components/Layout';
import InboxPage from './pages/InboxPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('inbox');

  const renderPage = () => {
    switch (currentPage) {
      case 'inbox':
        return <InboxPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return <SettingsPage />;
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
}

export default App;