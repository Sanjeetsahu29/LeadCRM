// Filter Panel Component
import React, { useState } from 'react';
import  dropdownOptions  from '../utils/constant';
import { X } from 'lucide-react';
const FilterPanel = ({ isOpen, onClose, onApplyFilters }) => {
  const [matchType, setMatchType] = useState('ALL');
  const [filters, setFilters] = useState([
    { field: 'Status', operator: 'equals', value: '' }
  ]);

  const addFilter = () => {
    setFilters([...filters, { field: 'Status', operator: 'equals', value: '' }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters([{ field: 'Status', operator: 'equals', value: '' }]);
    setMatchType('ALL');
  };

  const applyFilters = () => {
    onApplyFilters({ matchType, filters });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Match</span>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="matchType"
                value="ALL"
                checked={matchType === 'ALL'}
                onChange={(e) => setMatchType(e.target.value)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">ALL conditions (AND)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="matchType"
                value="ANY"
                checked={matchType === 'ANY'}
                onChange={(e) => setMatchType(e.target.value)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">ANY condition (OR)</span>
            </label>
          </div>
        </div>

        {filters.map((filter, index) => (
          <div key={index} className="flex items-center gap-3">
            <select
              value={filter.field}
              onChange={(e) => updateFilter(index, 'field', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Status">Status</option>
              <option value="Qualification">Qualification</option>
              <option value="Interest">Interest</option>
              <option value="Source">Source</option>
              <option value="Assigned To">Assigned To</option>
            </select>

            <select
              value={filter.value}
              onChange={(e) => updateFilter(index, 'value', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select {filter.field.toLowerCase()}</option>
              {filter.field === 'Status' && dropdownOptions.status.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              {filter.field === 'Qualification' && dropdownOptions.qualification.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              {filter.field === 'Interest' && dropdownOptions.interest.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              {filter.field === 'Source' && dropdownOptions.source.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
              {filter.field === 'Assigned To' && dropdownOptions.assignedTo.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <button
              onClick={() => removeFilter(index)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <button
          onClick={addFilter}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
        >
          Add Filter
        </button>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;