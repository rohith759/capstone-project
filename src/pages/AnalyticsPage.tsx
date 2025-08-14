import React from 'react';
import { mockMetrics } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const MetricCard = ({ metric }: { metric: typeof mockMetrics[0] }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
        {getTrendIcon(metric.trend)}
      </div>
      <div className="flex items-end space-x-2">
        <span className="text-3xl font-bold text-gray-900">
          {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
        </span>
        <div className={`flex items-center text-sm font-medium ${
          metric.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
          <span className="text-gray-500 ml-1">vs last period</span>
        </div>
      </div>
    </div>
  );

  const ChartPlaceholder = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">{description}</p>
          <p className="text-sm text-gray-500 mt-1">Chart visualization would appear here</p>
        </div>
      </div>
    </div>
  );

  const threatData = [
    { type: 'Phishing Attempts', count: 342, color: 'bg-red-500', percentage: 45 },
    { type: 'Malware Attachments', count: 128, color: 'bg-orange-500', percentage: 17 },
    { type: 'Spam Messages', count: 234, color: 'bg-yellow-500', percentage: 31 },
    { type: 'Spoofed Domains', count: 56, color: 'bg-purple-500', percentage: 7 },
  ];

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-gray-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Security Analytics</h1>
              <p className="text-gray-600">Monitor threat patterns and system performance</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mockMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPlaceholder
            title="Threat Detection Trends"
            description="Time series of detected threats"
          />
          
          <ChartPlaceholder
            title="Message Volume by Status"
            description="Distribution of allowed vs blocked messages"
          />
        </div>

        {/* Threat Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Threat Categories</h3>
            <div className="space-y-4">
              {threatData.map((threat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{threat.type}</span>
                    <span className="text-sm text-gray-600">{threat.count} incidents</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${threat.color}`}
                      style={{ width: `${threat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Security Health Score</h3>
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-green-600"
                    strokeDasharray={`${88 * 2.51327} ${88 * 2.51327}`}
                    strokeDashoffset={88 * 2.51327 * (1 - 0.88)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">88</span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Overall Security Health</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Detection: 99.2%</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-yellow-600" />
                    <span>False Pos: 0.3%</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="w-3 h-3 text-blue-600" />
                    <span>Coverage: 100%</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Activity className="w-3 h-3 text-purple-600" />
                    <span>Uptime: 99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Security Events</h3>
          <div className="space-y-4">
            {[
              {
                time: '2 minutes ago',
                event: 'High-risk phishing attempt blocked',
                details: 'PayPal lookalike domain detected',
                severity: 'critical',
                icon: XCircle
              },
              {
                time: '5 minutes ago',
                event: 'Suspicious attachment quarantined',
                details: 'Macro-enabled Excel file from unknown sender',
                severity: 'high',
                icon: AlertTriangle
              },
              {
                time: '12 minutes ago',
                event: 'Message released from quarantine',
                details: 'False positive resolved by analyst',
                severity: 'info',
                icon: CheckCircle
              },
              {
                time: '18 minutes ago',
                event: 'New domain added to blocklist',
                details: 'Automated threat intelligence update',
                severity: 'info',
                icon: Shield
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.severity === 'critical' ? 'bg-red-100' :
                  activity.severity === 'high' ? 'bg-orange-100' :
                  'bg-blue-100'
                }`}>
                  <activity.icon className={`w-4 h-4 ${
                    activity.severity === 'critical' ? 'text-red-600' :
                    activity.severity === 'high' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{activity.event}</h4>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;