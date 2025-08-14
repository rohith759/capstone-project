import React, { useState, useMemo } from 'react';
import { Message, FilterState } from '../types';
import { mockMessages } from '../data/mockData';
import MessageList from '../components/MessageList';
import MessageDetail from '../components/MessageDetail';
import FilterPanel from '../components/FilterPanel';
import { RefreshCw, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

const InboxPage: React.FC = () => {
  const [messages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    search: '',
    dateRange: [null, null],
    scoreRange: [0, 1],
    sender: ''
  });

  const messageStats = useMemo(() => {
    return {
      total: messages.length,
      allowed: messages.filter(m => m.status === 'allowed').length,
      quarantined: messages.filter(m => m.status === 'quarantined').length,
      blocked: messages.filter(m => m.status === 'blocked').length,
      suspicious: messages.filter(m => m.status === 'suspicious').length,
    };
  }, [messages]);

  const filteredMessages = useMemo(() => {
    return messages.filter(message => {
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(message.status)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSubject = message.subject.toLowerCase().includes(searchLower);
        const matchesSender = message.fromAddress.toLowerCase().includes(searchLower) ||
                             message.fromDisplay?.toLowerCase().includes(searchLower);
        const matchesToAddress = message.toAddress.toLowerCase().includes(searchLower);
        
        if (!matchesSubject && !matchesSender && !matchesToAddress) {
          return false;
        }
      }

      // Score range filter
      if (message.mlScore < filters.scoreRange[0] || message.mlScore > filters.scoreRange[1]) {
        return false;
      }

      return true;
    });
  }, [messages, filters]);

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleMessageAction = async (messageId: string, action: 'release' | 'block' | 'report') => {
    console.log(`Action ${action} on message ${messageId}`);
    // Here you would typically make an API call
    // For demo purposes, we'll just show a success message
    alert(`Message ${action} action completed successfully`);
    
    // If it's a release action, you might want to update the message status
    if (action === 'release') {
      // Update message status in real app
    }
  };

  const handleBulkAction = async (action: string) => {
    console.log(`Bulk action: ${action}`);
    // Implement bulk actions
  };

  const StatCard = ({ icon: Icon, label, value, change, color }: {
    icon: React.ElementType;
    label: string;
    value: number;
    change?: number;
    color: string;
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {change !== undefined && (
          <div className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon={CheckCircle2}
            label="Safe Messages"
            value={messageStats.allowed}
            color="bg-green-100 text-green-600"
          />
          <StatCard
            icon={AlertTriangle}
            label="Quarantined"
            value={messageStats.quarantined}
            color="bg-yellow-100 text-yellow-600"
          />
          <StatCard
            icon={XCircle}
            label="Blocked"
            value={messageStats.blocked}
            color="bg-red-100 text-red-600"
          />
          <StatCard
            icon={AlertTriangle}
            label="Suspicious"
            value={messageStats.suspicious}
            color="bg-orange-100 text-orange-600"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex space-x-6 min-h-0">
          {/* Sidebar - Filters */}
          <div className="w-72 flex-shrink-0">
            <FilterPanel 
              filters={filters}
              onFiltersChange={setFilters}
              messageStats={messageStats}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 flex space-x-6 min-h-0">
            <div className="w-1/2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Messages ({filteredMessages.length})
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <select 
                    onChange={(e) => handleBulkAction(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Bulk Actions</option>
                    <option value="release">Release Selected</option>
                    <option value="block">Block Selected</option>
                    <option value="whitelist">Add to Whitelist</option>
                  </select>
                </div>
              </div>
              <MessageList 
                messages={filteredMessages}
                selectedMessage={selectedMessage}
                onSelectMessage={setSelectedMessage}
                loading={loading}
              />
            </div>

            {/* Message Detail */}
            <div className="flex-1">
              {selectedMessage ? (
                <MessageDetail 
                  message={selectedMessage}
                  onBack={() => setSelectedMessage(null)}
                  onAction={handleMessageAction}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center h-full">
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Select a message</h3>
                    <p className="text-gray-500">Choose a message from the list to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;