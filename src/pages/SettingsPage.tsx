import React, { useState } from 'react';
import ContentFilterManager from '../components/ContentFilterManager';
import RealTimeEmailFeed from '../components/RealTimeEmailFeed';
import { Policy } from '../types';
import { mockPolicy } from '../data/mockData';
import { 
  Settings, 
  Shield, 
  Sliders, 
  Bell, 
  Users, 
  Lock,
  Save,
  RotateCcw,
  Filter,
  Activity
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [policy, setPolicy] = useState<Policy>(mockPolicy);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<'policy' | 'filters' | 'realtime'>('policy');

  const handlePolicyChange = (field: keyof Policy, value: any) => {
    setPolicy(prev => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    // Simulate API call
    console.log('Saving policy:', policy);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setPolicy(mockPolicy);
    setUnsavedChanges(false);
  };

  const SettingCard = ({ icon: Icon, title, children }: {
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

  const SliderSetting = ({ 
    label, 
    value, 
    onChange, 
    min = 0, 
    max = 1, 
    step = 0.01,
    description 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    description?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-blue-600">
          {Math.round(value * 100)}%
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );

  const ToggleSetting = ({ 
    label, 
    value, 
    onChange, 
    description 
  }: {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    description?: string;
  }) => (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-gray-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
              <p className="text-gray-600">Configure your email security policies and thresholds</p>
            </div>
          </div>
          
          {activeTab === 'policy' && (
            <div className="flex items-center space-x-3">
            {unsavedChanges && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Reset
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!unsavedChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save Changes
            </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 border-b border-gray-200">
          {[
            { key: 'policy', label: 'Security Policy', icon: Shield },
            { key: 'filters', label: 'Content Filters', icon: Filter },
            { key: 'realtime', label: 'Real-time Monitoring', icon: Activity },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'policy' && (
          <>
        {unsavedChanges && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                You have unsaved changes. Don't forget to save your settings.
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detection Thresholds */}
          <SettingCard icon={Sliders} title="Detection Thresholds">
            <div className="space-y-6">
              <SliderSetting
                label="Block Threshold"
                value={policy.blockThreshold}
                onChange={(value) => handlePolicyChange('blockThreshold', value)}
                description="Messages with risk scores above this threshold will be blocked"
              />
              
              <SliderSetting
                label="Quarantine Threshold"
                value={policy.quarantineThreshold}
                onChange={(value) => handlePolicyChange('quarantineThreshold', value)}
                description="Messages with risk scores above this threshold will be quarantined"
              />
              
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Safe (0-{Math.round(policy.quarantineThreshold * 100)}%)</span>
                    <span className="text-green-600">Allow</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium ({Math.round(policy.quarantineThreshold * 100)}-{Math.round(policy.blockThreshold * 100)}%)</span>
                    <span className="text-yellow-600">Quarantine</span>
                  </div>
                  <div className="flex justify-between">
                    <span>High ({Math.round(policy.blockThreshold * 100)}-100%)</span>
                    <span className="text-red-600">Block</span>
                  </div>
                </div>
              </div>
            </div>
          </SettingCard>

          {/* Content Filtering */}
          <SettingCard icon={Shield} title="Content Filtering">
            <div className="space-y-6">
              <ToggleSetting
                label="Block New Domains"
                value={policy.blockNewDomains}
                onChange={(value) => handlePolicyChange('blockNewDomains', value)}
                description="Automatically quarantine emails from domains registered less than 30 days ago"
              />
              
              <ToggleSetting
                label="Block Macro Attachments"
                value={policy.blockMacros}
                onChange={(value) => handlePolicyChange('blockMacros', value)}
                description="Block emails containing macro-enabled Office documents"
              />
              
              <ToggleSetting
                label="Allow External Images"
                value={policy.allowExternalImages}
                onChange={(value) => handlePolicyChange('allowExternalImages', value)}
                description="Allow loading of images from external sources in email previews"
              />
            </div>
          </SettingCard>

          {/* Notifications */}
          <SettingCard icon={Bell} title="Alert Notifications">
            <div className="space-y-6">
              <ToggleSetting
                label="Real-time Alerts"
                value={policy.enableRealTimeAlerts}
                onChange={(value) => handlePolicyChange('enableRealTimeAlerts', value)}
                description="Show real-time notifications when high-risk threats are detected"
              />
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Alert Thresholds</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Critical alerts (90%+ risk)</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">Immediate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">High alerts (70-89% risk)</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">Real-time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Medium alerts (50-69% risk)</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">Batched</span>
                  </div>
                </div>
              </div>
            </div>
          </SettingCard>

          {/* Access Control */}
          <SettingCard icon={Lock} title="Access Control">
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">User Permissions</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Users</span>
                      <p className="text-xs text-gray-600">Can view their own messages</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Read Only</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Analysts</span>
                      <p className="text-xs text-gray-600">Can manage quarantined messages</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Moderate</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-900">Admins</span>
                      <p className="text-xs text-gray-600">Full access to all features</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">Full Access</span>
                  </div>
                </div>
              </div>
            </div>
          </SettingCard>
        </div>

        {/* Allow/Block Lists */}
        <SettingCard icon={Users} title="Allow & Block Lists">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Trusted Senders</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-gray-700">@github.com</span>
                  <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm text-gray-700">support@company.com</span>
                  <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                </div>
                <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-green-300 hover:text-green-600 transition-colors">
                  + Add trusted sender
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Blocked Senders</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm text-gray-700">@suspicious.com</span>
                  <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="text-sm text-gray-700">spammer@evil.net</span>
                  <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                </div>
                <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors">
                  + Add blocked sender
                </button>
              </div>
            </div>
          </div>
        </SettingCard>
          </>
        )}

        {activeTab === 'filters' && (
          <ContentFilterManager />
        )}

        {activeTab === 'realtime' && (
          <div className="space-y-6">
            <RealTimeEmailFeed />
            
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Real-time Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Live Email Monitoring</p>
                    <p className="text-sm text-gray-600">Show incoming emails in real-time</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Threat Notifications</p>
                    <p className="text-sm text-gray-600">Instant alerts for high-risk emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Audio Alerts</p>
                    <p className="text-sm text-gray-600">Play sound for critical threats</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;