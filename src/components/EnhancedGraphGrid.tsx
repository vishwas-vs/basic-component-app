'use client';

import React from 'react';
import { Graph } from '@shrijulvenkatesh/ds-pesu.graph';
import { GraphData } from '@/data/sampleData';

interface EnhancedGraphGridProps {
  graphs: GraphData[];
  onGraphClick: (graphId: string) => void;
}

// Mock chart components for different types
const MockChartComponent: React.FC<{ graph: GraphData }> = ({ graph }) => {
  const getChartVisualization = () => {
    switch (graph.type) {
      case 'line':
        return (
          <svg viewBox="0 0 300 150" className="w-full h-full">
            <polyline
              fill="none"
              stroke={graph.color || '#3B82F6'}
              strokeWidth="2"
              points="10,130 50,100 90,110 130,70 170,80 210,40 250,50 290,20"
            />
            {graph.data.map((point, index) => (
              <circle
                key={`${graph.id}-point-${index}`}
                cx={10 + (index * 40)}
                cy={130 - (point.y / 100) * 100}
                r="3"
                fill={graph.color || '#3B82F6'}
              />
            ))}
          </svg>
        );
      case 'bar':
        return (
          <svg viewBox="0 0 300 150" className="w-full h-full">
            {graph.data.map((point, index) => (
              <rect
                key={`${graph.id}-bar-${index}`}
                x={10 + (index * 35)}
                y={150 - (point.y / Math.max(...graph.data.map(d => d.y))) * 130}
                width="30"
                height={(point.y / Math.max(...graph.data.map(d => d.y))) * 130}
                fill={graph.color || '#3B82F6'}
                opacity="0.8"
              />
            ))}
          </svg>
        );
      case 'pie':
        return (
          <svg viewBox="0 0 150 150" className="w-full h-full">
            <circle
              cx="75"
              cy="75"
              r="60"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <circle
              cx="75"
              cy="75"
              r="50"
              fill={graph.color || '#3B82F6'}
              opacity="0.8"
            />
            <text x="75" y="80" textAnchor="middle" className="text-xs fill-white">
              Pie Chart
            </text>
          </svg>
        );
      case 'area':
        return (
          <svg viewBox="0 0 300 150" className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${graph.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={graph.color || '#3B82F6'} stopOpacity="0.8" />
                <stop offset="100%" stopColor={graph.color || '#3B82F6'} stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <polygon
              fill={`url(#gradient-${graph.id})`}
              points="10,130 50,100 90,110 130,70 170,80 210,40 250,50 290,20 290,130 10,130"
            />
          </svg>
        );
      default:
        return <div className="flex items-center justify-center h-full text-gray-500">Chart</div>;
    }
  };

  return (
    <div className="w-full h-48 bg-gray-50 border border-gray-200 rounded p-4">
      {getChartVisualization()}
    </div>
  );
};

export const EnhancedGraphGrid: React.FC<EnhancedGraphGridProps> = ({ graphs, onGraphClick }) => {
  return (
    <div className="space-y-8">
      {/* Note about Bit Graph Component */}
      <div className="border border-gray-300 rounded p-4 bg-blue-50">
        <p className="text-sm text-blue-800 font-medium">
          📊 Bit Graph Component (@shrijulvenkatesh/ds-pesu.graph) is available
        </p>
        <p className="text-xs text-blue-600 mt-1">
          The component supports various chart types and configurations. 
          Below are custom implementations showcasing different chart variations.
        </p>
      </div>

      {/* Try using the actual Graph component for the first chart */}
      {graphs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Using Bit Graph Component: {graphs[0].title}
          </h3>
          <button
            onClick={() => onGraphClick(graphs[0].id)}
            className="w-full cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-0 border-0 bg-transparent text-left"
            aria-label={`View details for ${graphs[0].title}`}
          >
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="h-64 relative border border-gray-300 rounded bg-gray-50">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Graph 
                    data={graphs[0].data} 
                    categoryKey="x"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                  <div className="text-center">
                    <div className="text-2xl mb-2 text-gray-500">📊</div>
                    <p className="text-sm text-gray-600">Bit Graph Component</p>
                    <p className="text-xs text-gray-500">{graphs[0].data.length} data points</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Custom implementations for all graphs */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Custom Chart Implementations
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {graphs.map((graph) => (
            <button
              key={graph.id}
              onClick={() => onGraphClick(graph.id)}
              className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-0 border-0 bg-transparent text-left"
              aria-label={`View details for ${graph.title}`}
            >
              <div className="h-full border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="text-md font-semibold text-gray-900 mb-4">{graph.title}</h4>
                <MockChartComponent graph={graph} />
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                  <span className="capitalize">{graph.type} Chart</span>
                  <span>{graph.data.length} points</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedGraphGrid;