import React, { useState, useEffect } from 'react';
import { Alert } from '../types';
import { mockAlerts } from '../data/mockData';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Clock,
  Eye,
  EyeOff,
  Bell,
  BellOff
} from 'lucide-react';

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical' | 'warning'>('all');
  
  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new alerts
      if (Math.random() > 0.8) {
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          tenantId: 'tenant-1',
          severity: Math.random() > 0.5 ? 'warning' : 'critical',
          title: 'New Threat Detected',
          description: 'Suspicious email activity detected and blocked',
          createdAt: new Date().toISOString(),
          acknowledged: false,
          category: 'detection'
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityColors = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const alertTime = new Date(dateString);
    const diffMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return alertTime.toLocaleDateString();
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAcknowledgeAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !alert.acknowledged;
    if (filter === 'critical') return alert.severity === 'critical';
    if (filter === 'warning') return alert.severity === 'warning';
    return true;
  });

  const unreadCount = alerts.filter(alert => !alert.acknowledged).length;

  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-6 h-6 text-gray-700" />
              <h1 className="text-2xl font-bold text-gray-900">Security Alerts</h1>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={handleAcknowledgeAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          {[
            { key: 'all', label: 'All Alerts', count: alerts.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length },
            { key: 'warning', label: 'Warning', count: alerts.filter(a => a.severity === 'warning').length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12">
                <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
                <p className="text-gray-500">All clear! No security alerts match your current filter.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${getSeverityColors(alert.severity)} ${
                    !alert.acknowledged ? 'shadow-md' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {alert.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                              alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 mb-3">
                            {alert.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTimeAgo(alert.createdAt)}</span>
                            </div>
                            <span className="capitalize">{alert.category.replace('_', ' ')}</span>
                            {alert.messageId && (
                              <span>Message ID: {alert.messageId}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!alert.acknowledged && (
                            <button
                              onClick={() => handleAcknowledge(alert.id)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {alert.acknowledged && (
                            <div className="p-2 text-green-600" title="Acknowledged">
                              <EyeOff className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;