'use client';

import React from 'react';

import { ListViewItem } from '@/data/sampleData';

interface EnhancedDetailsListProps {
  items: ListViewItem[];
  title: string;
}

export const EnhancedDetailsList: React.FC<EnhancedDetailsListProps> = ({ items, title }) => {
  const getStatusClass = (status?: string) => {
    if (status === 'active') return 'bg-green-100 text-green-800';
    if (status === 'inactive') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {/* Note: Bit ListView Component Available */}
      <div className="mb-6">
        <div className="border border-gray-300 rounded p-4 bg-blue-50">
          <p className="text-sm text-blue-800 font-medium">
            📦 Bit ListView Component (@shrijulvenkatesh/ds-pesu.list-view) is available
          </p>
          <p className="text-xs text-blue-600 mt-1">
            The component requires specific data and column configurations. 
            Refer to the component documentation for proper implementation.
          </p>
        </div>
      </div>
      
      {/* Custom implementation */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">Custom Implementation:</h4>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{item.title}</h5>
                  {item.subtitle && (
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  )}
                  {item.metadata && (
                    <div className="mt-1 text-xs text-gray-500">
                      {Object.entries(item.metadata).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {item.value && (
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  )}
                  {item.status && (
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedDetailsList;