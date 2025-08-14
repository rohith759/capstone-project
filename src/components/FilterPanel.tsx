import React from 'react';
import { FilterState } from '../types';
import { Filter, Search, Calendar, Sliders } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  messageStats: {
    total: number;
    allowed: number;
    quarantined: number;
    blocked: number;
    suspicious: number;
  };
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, messageStats }) => {
  const statusOptions = [
    { value: 'all', label: 'All Messages', count: messageStats.total },
    { value: 'allowed', label: 'Safe', count: messageStats.allowed },
    { value: 'suspicious', label: 'Suspicious', count: messageStats.suspicious },
    { value: 'quarantined', label: 'Quarantined', count: messageStats.quarantined },
    { value: 'blocked', label: 'Blocked', count: messageStats.blocked },
  ];

  const handleStatusChange = (status: string) => {
    if (status === 'all') {
      onFiltersChange({ ...filters, status: [] });
    } else {
      const currentStatus = filters.status || [];
      const newStatus = currentStatus.includes(status)
        ? currentStatus.filter(s => s !== status)
        : [...currentStatus, status];
      onFiltersChange({ ...filters, status: newStatus });
    }
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleScoreRangeChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, scoreRange: range });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          <Search className="w-4 h-4 inline mr-2" />
          Search Messages
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Subject, sender, domain..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Status Filter */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Message Status</label>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                option.value === 'all' 
                  ? (filters.status.length === 0 ? 'bg-blue-50 border-blue-200 text-blue-800' : 'border-gray-200 hover:bg-gray-50')
                  : (filters.status.includes(option.value) ? 'bg-blue-50 border-blue-200 text-blue-800' : 'border-gray-200 hover:bg-gray-50')
              }`}
            >
              <span className="font-medium">{option.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                option.value === 'blocked' ? 'bg-red-100 text-red-800' :
                option.value === 'quarantined' ? 'bg-yellow-100 text-yellow-800' :
                option.value === 'suspicious' ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Risk Score Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          <Sliders className="w-4 h-4 inline mr-2" />
          Risk Score Range
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-8">Min:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.scoreRange[0] * 100}
              onChange={(e) => handleScoreRangeChange([parseInt(e.target.value) / 100, filters.scoreRange[1]])}
              className="flex-1"
            />
            <span className="text-sm font-medium w-8">{Math.round(filters.scoreRange[0] * 100)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-8">Max:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.scoreRange[1] * 100}
              onChange={(e) => handleScoreRangeChange([filters.scoreRange[0], parseInt(e.target.value) / 100])}
              className="flex-1"
            />
            <span className="text-sm font-medium w-8">{Math.round(filters.scoreRange[1] * 100)}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <button
            onClick={() => onFiltersChange({
              status: [],
              search: '',
              dateRange: [null, null],
              scoreRange: [0, 1],
              sender: ''
            })}
            className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
          <button
            onClick={() => handleStatusChange('quarantined')}
            className="w-full px-3 py-2 text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg transition-colors"
          >
            Show Quarantined Only
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;