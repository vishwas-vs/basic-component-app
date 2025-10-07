'use client';

import React from 'react';
import { NavigationHistory } from '@/types/navigation';

interface NavigationProps {
  history: NavigationHistory;
  onBackToDashboard: () => void;
  onBackToGraphs: () => void;
  currentLevel: 'dashboard' | 'graphs' | 'details';
}

export const Navigation: React.FC<NavigationProps> = ({ 
  history, 
  onBackToDashboard, 
  onBackToGraphs, 
  currentLevel 
}) => {
  if (currentLevel === 'dashboard') {
    return null;
  }

  return (
    <nav className="mb-6 flex items-center space-x-2 text-sm">
      <button
        onClick={onBackToDashboard}
        className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
      >
        Dashboard
      </button>
      
      {currentLevel === 'graphs' && history.statTitle && (
        <>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{history.statTitle}</span>
        </>
      )}
      
      {currentLevel === 'details' && (
        <>
          <span className="text-gray-400">/</span>
          {history.statTitle && (
            <button
              onClick={onBackToGraphs}
              className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
            >
              {history.statTitle}
            </button>
          )}
          {history.graphTitle && (
            <>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{history.graphTitle}</span>
            </>
          )}
        </>
      )}
    </nav>
  );
};

export default Navigation;