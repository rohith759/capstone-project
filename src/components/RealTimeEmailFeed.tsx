import React, { useState, useEffect } from 'react';
import { RealTimeEmail } from '../types';
import { 
  Activity, 
  Mail, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Zap
} from 'lucide-react';

interface RealTimeEmailFeedProps {
  onNewThreat?: (email: RealTimeEmail) => void;
}

const RealTimeEmailFeed: React.FC<RealTimeEmailFeedProps> = ({ onNewThreat }) => {
  const [emails, setEmails] = useState<RealTimeEmail[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate real-time email feed
    const interval = setInterval(() => {
      const newEmail: RealTimeEmail = {
        id: `email-${Date.now()}`,
        messageId: `<${Date.now()}@example.com>`,
        fromAddress: generateRandomSender(),
        fromDisplay: generateRandomDisplayName(),
        toAddress: generateRandomRecipient(),
        subject: generateRandomSubject(),
        receivedAt: new Date().toISOString(),
        mlScore: Math.random(),
        status: 'processing',
        riskLevel: 'low',
      };

      // Determine status and risk based on ML score
      if (newEmail.mlScore >= 0.9) {
        newEmail.status = 'blocked';
        newEmail.riskLevel = 'critical';
        newEmail.threatType = 'Phishing Attempt';
      } else if (newEmail.mlScore >= 0.7) {
        newEmail.status = 'quarantined';
        newEmail.riskLevel = 'high';
        newEmail.threatType = 'Suspicious Content';
      } else if (newEmail.mlScore >= 0.5) {
        newEmail.status = 'quarantined';
        newEmail.riskLevel = 'medium';
        newEmail.threatType = 'Policy Violation';
      } else {
        newEmail.status = 'allowed';
        newEmail.riskLevel = 'low';
      }

      setEmails(prev => [newEmail, ...prev.slice(0, 19)]); // Keep last 20

      // Notify parent of new threats
      if (newEmail.riskLevel === 'critical' || newEmail.riskLevel === 'high') {
        onNewThreat?.(newEmail);
      }
    }, 3000 + Math.random() * 4000); // Random interval 3-7 seconds

    return () => clearInterval(interval);
  }, [onNewThreat]);

  const generateRandomSender = () => {
    const domains = [
      'gmail.com', 'outlook.com', 'company.com', 'suspicious.net', 
      'paypaI.com', 'bank-alert.org', 'github.com', 'microsoft.com'
    ];
    const names = ['john', 'admin', 'security', 'noreply', 'support', 'billing'];
    return `${names[Math.floor(Math.random() * names.length)]}@${domains[Math.floor(Math.random() * domains.length)]}`;
  };

  const generateRandomDisplayName = () => {
    const names = [
      'PayPal Security', 'Bank Alert', 'GitHub', 'Microsoft Support',
      'Admin Team', 'Security Notice', 'Billing Department', 'IT Support'
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateRandomRecipient = () => {
    const users = ['john.doe', 'jane.smith', 'mike.johnson', 'sarah.wilson', 'bob.anderson'];
    return `${users[Math.floor(Math.random() * users.length)]}@company.com`;
  };

  const generateRandomSubject = () => {
    const subjects = [
      'Urgent: Verify Your Account',
      'Invoice Payment Required',
      'Security Alert: Suspicious Activity',
      'Your GitHub notification',
      'Weekly Newsletter',
      'Password Reset Request',
      'Account Suspended - Action Required',
      'Meeting Invitation'
    ];
    return subjects[Math.floor(Math.random() * subjects.length)];
  };

  const getStatusIcon = (status: string, riskLevel: string) => {
    if (status === 'processing') {
      return <Activity className="w-4 h-4 text-blue-600 animate-pulse" />;
    }
    
    switch (riskLevel) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getStatusColor = (status: string, riskLevel: string) => {
    if (status === 'processing') {
      return 'border-l-blue-500 bg-blue-50';
    }
    
    switch (riskLevel) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const emailTime = new Date(dateString);
    const diffSeconds = Math.floor((now.getTime() - emailTime.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Real-Time Email Feed</h3>
            <p className="text-sm text-gray-600">Live monitoring of incoming messages</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-auto">
        {emails.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Waiting for incoming emails...</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className={`p-3 border-l-4 rounded-lg transition-all duration-300 ${getStatusColor(email.status, email.riskLevel)}`}
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(email.status, email.riskLevel)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {email.subject}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(email.receivedAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>From: {email.fromDisplay || email.fromAddress}</p>
                      <p>To: {email.toAddress}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        email.status === 'blocked' ? 'bg-red-100 text-red-800' :
                        email.status === 'quarantined' ? 'bg-yellow-100 text-yellow-800' :
                        email.status === 'allowed' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {email.status === 'processing' ? 'Processing' : email.status}
                      </span>
                      
                      <span className="text-xs font-bold text-gray-700">
                        {Math.round(email.mlScore * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  {email.threatType && (
                    <div className="mt-2">
                      <span className="text-xs text-red-600 font-medium">
                        🚨 {email.threatType}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeEmailFeed;