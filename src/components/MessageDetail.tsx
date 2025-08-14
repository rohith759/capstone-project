import React from 'react';
import { Message } from '../types';
import StatusBadge from './StatusBadge';
import SecurityScore from './SecurityScore';
import { 
  ArrowLeft, 
  Download, 
  Flag, 
  Shield, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Paperclip,
  Eye,
  Code,
  Clock,
  MapPin
} from 'lucide-react';

interface MessageDetailProps {
  message: Message;
  onBack: () => void;
  onAction: (messageId: string, action: 'release' | 'block' | 'report') => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onBack, onAction }) => {
  const [viewMode, setViewMode] = React.useState<'preview' | 'raw'>('preview');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getIndicatorIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRiskFactorColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                {message.subject}
              </h2>
              <p className="text-sm text-gray-600">
                From: {message.fromDisplay || message.fromAddress}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <StatusBadge status={message.status} />
            <SecurityScore score={message.mlScore} showLabel={false} />
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-4 flex items-center space-x-3">
          {message.status === 'quarantined' && (
            <button
              onClick={() => onAction(message.id, 'release')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Release Message
            </button>
          )}
          <button
            onClick={() => onAction(message.id, 'report')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <Flag className="w-4 h-4 inline mr-2" />
            Report as Phishing
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Download className="w-4 h-4 inline mr-2" />
            Download EML
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Message Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Security Analysis
              </h3>
              
              {/* Risk Factors */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Risk Factors</h4>
                {message.riskFactors.map((factor, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${getRiskFactorColor(factor.severity)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium capitalize">
                        {factor.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-bold uppercase">
                        {factor.severity}
                      </span>
                    </div>
                    <p className="text-sm">{factor.description}</p>
                    <p className="text-xs mt-1">Score: {Math.round(factor.score * 100)}/100</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Authentication Results
              </h3>
              
              {/* Security Indicators */}
              <div className="space-y-3">
                {message.indicators.map((indicator, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getIndicatorIcon(indicator.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 uppercase text-sm">
                          {indicator.type.replace('_', ' ')}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          indicator.status === 'pass' ? 'bg-green-100 text-green-800' :
                          indicator.status === 'fail' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {indicator.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{indicator.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Details */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Received:</span>
                <span className="font-medium">{formatDate(message.receivedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Source IP:</span>
                <span className="font-medium">{message.sourceIp}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Paperclip className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Attachments:</span>
                <span className="font-medium">{message.attachmentCount}</span>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'preview' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'raw' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4 inline mr-1" />
                Raw
              </button>
            </div>

            {/* Message Content */}
            <div className="border rounded-lg bg-gray-50 p-4">
              {viewMode === 'preview' ? (
                <div className="prose prose-sm max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: message.bodyHtml || message.bodyText 
                    }} 
                    className="text-gray-800"
                  />
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono">
                  {`Message-ID: ${message.messageId}
From: ${message.fromAddress}
To: ${message.toAddress}
Subject: ${message.subject}
Date: ${message.receivedAt}
Content-Length: ${message.size}

${message.bodyText}`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;