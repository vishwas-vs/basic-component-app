'use client';

import React from 'react';
import { StatCardData } from '@/data/sampleData';
import styles from './StatsGrid.module.css';

interface StatsGridProps {
  stats: StatCardData[];
  onStatClick: (statId: string) => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, onStatClick }) => {
  const getTrendColorClass = (direction?: string) => {
    if (direction === 'up') return 'text-green-600';
    if (direction === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (direction?: string) => {
    if (direction === 'up') return '↑';
    if (direction === 'down') return '↓';
    return '→';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <button
          key={stat.id}
          onClick={() => onStatClick(stat.id)}
          className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-0 border-0 bg-transparent text-left"
          aria-label={`View details for ${stat.title}`}
        >
          <div className={`h-full ${styles.statCard} rounded-lg p-4 bg-white shadow-sm border-2 border-gray-200`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <div className={`text-sm font-medium ${getTrendColorClass(stat.trendDirection)}`}>
                {stat.trend !== undefined && stat.trend !== 0 && (
                  <>
                    {getTrendIcon(stat.trendDirection)}
                    {Math.abs(stat.trend)}%
                  </>
                )}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
            <p className={`${styles.statValue} text-gray-900`}>
              {stat.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <p className="text-sm text-gray-600">{stat.subtitle}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StatsGrid;