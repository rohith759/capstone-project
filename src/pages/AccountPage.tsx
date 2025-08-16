import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Globe, 
  Clock, 
  Key,
  Smartphone,
  Save,
  Camera,
  Edit3,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const AccountPage: React.FC = () => {
  const { auth, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.user?.name || '',
    email: auth.user?.email || '',
    timezone: auth.user?.preferences.timezone || 'UTC',
    language: auth.user?.preferences.language || 'en',
    notifications: auth.user?.preferences.notifications || {
      email: true,
      push: true,
      realTime: true
    }
  });

  const handleSave = async () => {
    if (auth.user) {
      updateUser({
        name: formData.name,
        email: formData.email,
        preferences: {
          ...auth.user.preferences,
          timezone: formData.timezone,
          language: formData.language,
          notifications: formData.notifications
        }
      });
    }
    setEditing(false);
  };

  const handleCancel = () => {
    if (auth.user) {
      setFormData({
        name: auth.user.name,
        email: auth.user.email,
        timezone: auth.user.preferences.timezone,
        language: auth.user.preferences.language,
        notifications: auth.user.preferences.notifications
      });
    }
    setEditing(false);
  };

  if (!auth.user) return null;

  const InfoCard = ({ icon: Icon, title, children }: {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-gray-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your profile and security preferences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {editing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit3 className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <InfoCard icon={User} title="Profile">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={auth.user.avatar}
                    alt={auth.user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900">{auth.user.name}</h3>
                <p className="text-gray-600 mb-2">{auth.user.email}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    auth.user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    auth.user.role === 'analyst' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1)}
                  </span>
                  {auth.user.mfaEnabled && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">MFA Enabled</span>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Tenant: {auth.user.tenantName}</p>
                  <p>Member since: {new Date(auth.user.createdAt).toLocaleDateString()}</p>
                  <p>Last login: {new Date(auth.user.lastLoginAt).toLocaleDateString()}</p>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard icon={Mail} title="Account Information">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{auth.user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {editing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{auth.user.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    {editing ? (
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 py-2">{auth.user.preferences.timezone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    {editing ? (
                      <select
                        value={formData.language}
                        onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 py-2">
                        {auth.user.preferences.language === 'en' ? 'English' : auth.user.preferences.language}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </InfoCard>

            <InfoCard icon={Bell} title="Notification Preferences">
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', description: 'Receive security alerts via email' },
                  { key: 'push', label: 'Push Notifications', description: 'Browser push notifications for critical alerts' },
                  { key: 'realTime', label: 'Real-time Alerts', description: 'Live dashboard notifications' }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-start justify-between">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-gray-700">{setting.label}</label>
                      <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.notifications[setting.key as keyof typeof formData.notifications]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            [setting.key]: e.target.checked
                          }
                        }))}
                        disabled={!editing}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard icon={Shield} title="Security">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Two-Factor Authentication</p>
                      <p className="text-sm text-green-600">Your account is protected with 2FA</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-green-700 hover:text-green-900 font-medium">
                    Manage
                  </button>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                    </div>
                    <Edit3 className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Trusted Devices</p>
                        <p className="text-sm text-gray-500">Manage your trusted devices</p>
                      </div>
                    </div>
                    <Edit3 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </InfoCard>

            {/* Activity Log */}
            <InfoCard icon={Clock} title="Recent Activity">
              <div className="space-y-3">
                {[
                  {
                    action: 'Login successful',
                    time: '2 minutes ago',
                    ip: '192.168.1.100',
                    device: 'Chrome on Windows',
                    status: 'success'
                  },
                  {
                    action: 'Released quarantined message',
                    time: '1 hour ago',
                    ip: '192.168.1.100',
                    device: 'Chrome on Windows',
                    status: 'info'
                  },
                  {
                    action: 'Updated notification preferences',
                    time: '2 days ago',
                    ip: '192.168.1.100',
                    device: 'Chrome on Windows',
                    status: 'info'
                  },
                  {
                    action: 'Failed login attempt',
                    time: '3 days ago',
                    ip: '203.0.113.5',
                    device: 'Unknown',
                    status: 'warning'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      activity.status === 'success' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : activity.status === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{activity.action}</h4>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>IP: {activity.ip}</p>
                        <p>Device: {activity.device}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;