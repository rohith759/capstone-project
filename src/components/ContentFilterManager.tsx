import React, { useState } from 'react';
import { ContentFilter } from '../types';
import { 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Toggle, 
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ContentFilterManager: React.FC = () => {
  const [filters, setFilters] = useState<ContentFilter[]>([
    {
      id: '1',
      name: 'Phishing Keywords',
      type: 'keyword',
      pattern: 'urgent|verify|suspend|click here|act now',
      action: 'quarantine',
      enabled: true,
      priority: 1,
      description: 'Detects common phishing language patterns',
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-01-16T00:00:00Z'
    },
    {
      id: '2',
      name: 'Suspicious Domains',
      type: 'domain',
      pattern: 'paypaI.com|microsft.com|gmai1.com',
      action: 'block',
      enabled: true,
      priority: 2,
      description: 'Blocks known lookalike domains',
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-01-16T00:00:00Z'
    },
    {
      id: '3',
      name: 'Macro Attachments',
      type: 'attachment',
      pattern: '\\.(docm|xlsm|pptm|dotm)$',
      action: 'block',
      enabled: true,
      priority: 3,
      description: 'Blocks macro-enabled Office documents',
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-01-16T00:00:00Z'
    },
    {
      id: '4',
      name: 'URL Shorteners',
      type: 'url',
      pattern: 'bit\\.ly|tinyurl\\.com|t\\.co|goo\\.gl',
      action: 'quarantine',
      enabled: false,
      priority: 4,
      description: 'Quarantines emails with shortened URLs',
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-01-16T00:00:00Z'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFilter, setEditingFilter] = useState<ContentFilter | null>(null);

  const filteredFilters = filters.filter(filter =>
    filter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    filter.pattern.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFilter = (filterId: string) => {
    setFilters(prev => prev.map(filter =>
      filter.id === filterId ? { ...filter, enabled: !filter.enabled } : filter
    ));
  };

  const deleteFilter = (filterId: string) => {
    setFilters(prev => prev.filter(filter => filter.id !== filterId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'keyword':
        return '🔤';
      case 'domain':
        return '🌐';
      case 'attachment':
        return '📎';
      case 'url':
        return '🔗';
      case 'header':
        return '📧';
      default:
        return '⚙️';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'block':
        return 'bg-red-100 text-red-800';
      case 'quarantine':
        return 'bg-yellow-100 text-yellow-800';
      case 'allow':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const FilterForm = ({ filter, onSave, onCancel }: {
    filter?: ContentFilter;
    onSave: (filter: Omit<ContentFilter, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: filter?.name || '',
      type: filter?.type || 'keyword',
      pattern: filter?.pattern || '',
      action: filter?.action || 'quarantine',
      enabled: filter?.enabled ?? true,
      priority: filter?.priority || 1,
      description: filter?.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {filter ? 'Edit Filter' : 'Add New Filter'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="keyword">Keyword</option>
                <option value="domain">Domain</option>
                <option value="attachment">Attachment</option>
                <option value="url">URL</option>
                <option value="header">Header</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pattern (Regex)
              </label>
              <input
                type="text"
                value={formData.pattern}
                onChange={(e) => setFormData(prev => ({ ...prev, pattern: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter regex pattern"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Action
              </label>
              <select
                value={formData.action}
                onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="allow">Allow</option>
                <option value="quarantine">Quarantine</option>
                <option value="block">Block</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe what this filter does"
              />
            </div>
            
            <div className="flex items-center space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {filter ? 'Update' : 'Create'} Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveFilter = (filterData: Omit<ContentFilter, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingFilter) {
      setFilters(prev => prev.map(filter =>
        filter.id === editingFilter.id
          ? { ...filter, ...filterData, updatedAt: new Date().toISOString() }
          : filter
      ));
      setEditingFilter(null);
    } else {
      const newFilter: ContentFilter = {
        ...filterData,
        id: `filter-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setFilters(prev => [...prev, newFilter]);
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Filter className="w-6 h-6 text-gray-700" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">Content Filters</h2>
            <p className="text-gray-600">Manage email content filtering rules</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Add Filter
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search filters..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredFilters.map((filter) => (
            <div key={filter.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getTypeIcon(filter.type)}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{filter.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActionColor(filter.action)}`}>
                        {filter.action}
                      </span>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {filter.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{filter.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {filter.pattern}
                      </span>
                      <span>Priority: {filter.priority}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      filter.enabled 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={filter.enabled ? 'Disable filter' : 'Enable filter'}
                  >
                    {filter.enabled ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setEditingFilter(filter)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit filter"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => deleteFilter(filter.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete filter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Filters</p>
              <p className="text-2xl font-bold text-gray-900">{filters.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {filters.filter(f => f.enabled).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Block Rules</p>
              <p className="text-2xl font-bold text-gray-900">
                {filters.filter(f => f.action === 'block').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Quarantine Rules</p>
              <p className="text-2xl font-bold text-gray-900">
                {filters.filter(f => f.action === 'quarantine').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingFilter) && (
        <FilterForm
          filter={editingFilter || undefined}
          onSave={handleSaveFilter}
          onCancel={() => {
            setShowAddForm(false);
            setEditingFilter(null);
          }}
        />
      )}
    </div>
  );
};

export default ContentFilterManager;