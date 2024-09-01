import React from 'react';

const FilterBar = ({ categories, onFilterChange, onSearchChange }) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <select
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search habits..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-64 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default FilterBar;