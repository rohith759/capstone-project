import React from 'react';
import { Message } from '../types';
import StatusBadge from './StatusBadge';
import SecurityScore from './SecurityScore';
import { Mail, Paperclip, ExternalLink, Calendar } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  selectedMessage?: Message;
  onSelectMessage: (message: Message) => void;
  loading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  selectedMessage, 
  onSelectMessage, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No messages found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return `${Math.round(diffHours * 60)}m ago`;
    } else if (diffHours < 24) {
      return `${Math.round(diffHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200 max-h-full overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => onSelectMessage(message)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <SecurityScore score={message.mlScore} size="sm" showLabel={false} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {message.fromDisplay || message.fromAddress}
                    </h4>
                    <StatusBadge status={message.status} size="sm" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(message.receivedAt)}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-900 font-medium truncate mb-1">
                  {message.subject}
                </p>
                
                <p className="text-sm text-gray-600 truncate mb-3">
                  To: {message.toAddress}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {message.attachmentCount > 0 && (
                      <div className="flex items-center space-x-1">
                        <Paperclip className="w-3 h-3" />
                        <span>{message.attachmentCount}</span>
                      </div>
                    )}
                    {message.urlCount > 0 && (
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>{message.urlCount}</span>
                      </div>
                    )}
                  </div>
                  
                  {message.status === 'quarantined' && message.quarantineReason && (
                    <div className="text-xs text-orange-600 max-w-xs truncate">
                      {message.quarantineReason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;