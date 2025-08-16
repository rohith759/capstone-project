import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Mail, 
  Shield, 
  AlertTriangle, 
  Settings, 
  Users, 
  BarChart3, 
  Menu, 
  X,
  Bell,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  unreadAlerts?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange, unreadAlerts = 0 }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { auth, logout } = useAuth();

  const navigation = [
    { id: 'inbox', name: 'Inbox', icon: Mail, badge: undefined },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle, badge: unreadAlerts > 0 ? unreadAlerts : undefined },
    { id: 'settings', name: 'Settings', icon: Settings, badge: undefined },
    { id: 'account', name: 'Account', icon: User, badge: undefined },
    { id: 'admin', name: 'Admin', icon: Users, badge: undefined },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, badge: undefined },
  ];

  const NavItem = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = currentPage === item.id;
    return (
      <button
        onClick={() => {
          onPageChange(item.id);
          setSidebarOpen(false);
        }}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <div className="flex items-center space-x-3">
          <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
          <span>{item.name}</span>
        </div>
        {item.badge && (
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
            isActive 
              ? 'bg-blue-800 text-blue-200' 
              : 'bg-red-500 text-white'
          }`}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50">
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">SecureGateway</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="mt-6 px-4 space-y-2">
              {navigation.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white shadow-sm border-r border-gray-200">
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-xl font-bold text-gray-900">SecureGateway</h1>
          </div>
          <nav className="mt-6 px-4 space-y-2 flex-1">
            {navigation.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {currentPage === 'inbox' ? 'Email Security Dashboard' : currentPage}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{unreadAlerts}</span>
                  </span>
                )}
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={auth.user?.avatar}
                    alt={auth.user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{auth.user?.name}</p>
                    <p className="text-xs text-gray-500">{auth.user?.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{auth.user?.name}</p>
                      <p className="text-xs text-gray-500">{auth.user?.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onPageChange('account');
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        <span>Account Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;