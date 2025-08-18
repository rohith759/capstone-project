import React, { useState, useEffect } from 'react';
import { GmailConnection, EmailThreat, SafetyCheck } from '../types';
import { 
  Mail, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Link,
  Unlink,
  Eye,
  Block,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';

const GmailIntegration: React.FC = () => {
  const [connection, setConnection] = useState<GmailConnection | null>(null);
  const [threats, setThreats] = useState<EmailThreat[]>([]);
  const [safetyChecks, setSafetyChecks] = useState<SafetyCheck[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [realTimeProtection, setRealTimeProtection] = useState(true);

  // Simulate Gmail connection
  const connectGmail = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockConnection: GmailConnection = {
      id: 'gmail-conn-1',
      userId: 'user-1',
      email: 'user@gmail.com',
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      isConnected: true,
      lastSync: new Date().toISOString(),
      totalEmails: 1247,
      blockedEmails: 23,
      quarantinedEmails: 8
    };
    
    setConnection(mockConnection);
    setIsConnecting(false);
    
    // Start real-time monitoring
    startRealTimeMonitoring();
  };

  const disconnectGmail = () => {
    setConnection(null);
    setThreats([]);
    setSafetyChecks([]);
  };

  const startRealTimeMonitoring = () => {
    // Simulate real-time email monitoring
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat: EmailThreat = {
          id: `threat-${Date.now()}`,
          messageId: `<${Date.now()}@suspicious.com>`,
          fromAddress: generateSuspiciousEmail(),
          subject: generateSuspiciousSubject(),
          threatType: getRandomThreatType(),
          riskScore: 0.7 + Math.random() * 0.3,
          detectedAt: new Date().toISOString(),
          blocked: true,
          reason: generateThreatReason()
        };
        
        setThreats(prev => [newThreat, ...prev.slice(0, 19)]);
      }
      
      if (Math.random() > 0.6) {
        const safeCheck: SafetyCheck = {
          id: `safe-${Date.now()}`,
          messageId: `<${Date.now()}@legitimate.com>`,
          fromAddress: generateLegitimateEmail(),
          subject: generateLegitimateSubject(),
          safetyScore: Math.random() * 0.3,
          checks: {
            spf: Math.random() > 0.1,
            dkim: Math.random() > 0.1,
            dmarc: Math.random() > 0.2,
            reputation: Math.random() > 0.05,
            content: Math.random() > 0.1,
            attachments: Math.random() > 0.05
          },
          recommendation: 'allow',
          timestamp: new Date().toISOString()
        };
        
        setSafetyChecks(prev => [safeCheck, ...prev.slice(0, 19)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  const generateSuspiciousEmail = () => {
    const suspicious = [
      'security@paypaI.com',
      'noreply@microsft.com',
      'admin@bank-alert.net',
      'support@gmai1.com',
      'billing@amazom.com'
    ];
    return suspicious[Math.floor(Math.random() * suspicious.length)];
  };

  const generateSuspiciousSubject = () => {
    const subjects = [
      'URGENT: Verify Your Account Now',
      'Your Account Has Been Suspended',
      'Immediate Action Required - Security Alert',
      'Confirm Your Identity to Avoid Closure',
      'Payment Failed - Update Information'
    ];
    return subjects[Math.floor(Math.random() * subjects.length)];
  };

  const generateLegitimateEmail = () => {
    const legitimate = [
      'noreply@github.com',
      'notifications@linkedin.com',
      'team@company.com',
      'support@microsoft.com',
      'news@newsletter.com'
    ];
    return legitimate[Math.floor(Math.random() * legitimate.length)];
  };

  const generateLegitimateSubject = () => {
    const subjects = [
      'Weekly Team Update',
      'Your GitHub notification',
      'New connection request',
      'Monthly Newsletter',
      'Meeting reminder'
    ];
    return subjects[Math.floor(Math.random() * subjects.length)];
  };

  const getRandomThreatType = (): EmailThreat['threatType'] => {
    const types: EmailThreat['threatType'][] = ['phishing', 'spam', 'malware', 'duplicate', 'fake'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const generateThreatReason = () => {
    const reasons = [
      'Lookalike domain detected',
      'Suspicious attachment found',
      'Phishing keywords identified',
      'Failed authentication checks',
      'Known malicious sender'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const getThreatIcon = (type: EmailThreat['threatType']) => {
    switch (type) {
      case 'phishing':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'malware':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'spam':
        return <Block className="w-4 h-4 text-orange-600" />;
      case 'duplicate':
        return <Activity className="w-4 h-4 text-yellow-600" />;
      case 'fake':
        return <Eye className="w-4 h-4 text-purple-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  };

  useEffect(() => {
    if (connection && realTimeProtection) {
      return startRealTimeMonitoring();
    }
  }, [connection, realTimeProtection]);

  return (
    <div className="space-y-6">
      {/* Gmail Connection Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Mail className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Gmail Integration</h3>
              <p className="text-sm text-gray-600">
                {connection ? `Connected to ${connection.email}` : 'Connect your Gmail account for real-time protection'}
              </p>
            </div>
          </div>
          
          {connection ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </div>
              <button
                onClick={disconnectGmail}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <Unlink className="w-4 h-4 inline mr-2" />
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectGmail}
              disabled={isConnecting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {isConnecting ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link className="w-4 h-4" />
                  <span>Connect Gmail</span>
                </div>
              )}
            </button>
          )}
        </div>

        {connection && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Total Emails</p>
                  <p className="text-2xl font-bold text-blue-600">{connection.totalEmails.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-900">Blocked</p>
                  <p className="text-2xl font-bold text-red-600">{connection.blockedEmails}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Quarantined</p>
                  <p className="text-2xl font-bold text-yellow-600">{connection.quarantinedEmails}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {connection && (
        <>
          {/* Real-time Protection Toggle */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Real-time Protection</h4>
                  <p className="text-sm text-gray-600">Automatically scan and block threats before they reach your inbox</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={realTimeProtection}
                  onChange={(e) => setRealTimeProtection(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Threat Detection Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                  Blocked Threats
                </h4>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  {threats.length} detected
                </span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-auto">
                {threats.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No threats detected</p>
                  </div>
                ) : (
                  threats.map((threat) => (
                    <div key={threat.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        {getThreatIcon(threat.threatType)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="text-sm font-medium text-gray-900 truncate">
                              {threat.subject}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(threat.detectedAt)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">From: {threat.fromAddress}</p>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              threat.threatType === 'phishing' ? 'bg-red-100 text-red-800' :
                              threat.threatType === 'malware' ? 'bg-purple-100 text-purple-800' :
                              threat.threatType === 'spam' ? 'bg-orange-100 text-orange-800' :
                              threat.threatType === 'duplicate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {threat.threatType}
                            </span>
                            <span className="text-xs font-bold text-red-600">
                              {Math.round(threat.riskScore * 100)}% risk
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{threat.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Safe Email Feed */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Safe Emails
                </h4>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {safetyChecks.length} verified
                </span>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-auto">
                {safetyChecks.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No emails processed yet</p>
                  </div>
                ) : (
                  safetyChecks.map((check) => (
                    <div key={check.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="text-sm font-medium text-gray-900 truncate">
                              {check.subject}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(check.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">From: {check.fromAddress}</p>
                          
                          <div className="grid grid-cols-3 gap-1 mb-2">
                            {Object.entries(check.checks).map(([key, passed]) => (
                              <div key={key} className="flex items-center space-x-1">
                                {passed ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <XCircle className="w-3 h-3 text-red-500" />
                                )}
                                <span className="text-xs text-gray-600 uppercase">{key}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Safe to receive
                            </span>
                            <span className="text-xs font-bold text-green-600">
                              {Math.round((1 - check.safetyScore) * 100)}% safe
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GmailIntegration;