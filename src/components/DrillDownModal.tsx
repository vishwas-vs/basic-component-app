'use client';

import React, { useState } from 'react';
import { GraphData, StatCardData, ListViewItem } from '@/data/sampleData';
import { Graph } from '@shrijulvenkatesh/ds-pesu.graph';

interface DrillDownModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'graph' | 'stat' | 'list';
  data: GraphData | StatCardData | ListViewItem[] | null;
  relatedData?: {
    graphs?: GraphData[];
    lists?: ListViewItem[];
    stats?: StatCardData[];
  };
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
  data,
  relatedData
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'analysis'>('overview');

  if (!isOpen || !data) return null;

  const renderGraphAnalysis = (graphData: GraphData) => {
    const values = graphData.data.map(d => d.y);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);


    return (
      <div className="space-y-6">
        {/* Enhanced Graph Display */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Enhanced {graphData.title}</h3>
          <div className="h-80 border rounded bg-gray-50 flex items-center justify-center">
            <Graph 
              data={graphData.data}
              categoryKey="x"
              dataKey="y"
            />
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{values.length}</div>
            <div className="text-sm text-blue-700">Data Points</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(average)}</div>
            <div className="text-sm text-green-700">Average</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{total.toLocaleString()}</div>
            <div className="text-sm text-purple-700">Total</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{min}</div>
            <div className="text-sm text-orange-700">Minimum</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{max}</div>
            <div className="text-sm text-red-700">Maximum</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="text-md font-semibold mb-3">Raw Data</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Value</th>
                  <th className="text-right p-2">% of Total</th>
                  <th className="text-center p-2">Label</th>
                </tr>
              </thead>
              <tbody>
                {graphData.data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.x}</td>
                    <td className="p-2 text-right font-medium">{item.y.toLocaleString()}</td>
                    <td className="p-2 text-right">{((item.y / total) * 100).toFixed(1)}%</td>
                    <td className="p-2 text-center">{item.label || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderStatAnalysis = (statData: StatCardData) => {
    return (
      <div className="space-y-6">
        {/* Enhanced Stat Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">{statData.icon}</div>
            <div className={`text-lg font-bold ${
              statData.trendDirection === 'up' ? 'text-green-600' : 
              statData.trendDirection === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {statData.trend !== undefined && statData.trend !== 0 && (
                <>
                  {statData.trendDirection === 'up' ? '↗️' : statData.trendDirection === 'down' ? '↘️' : '➡️'}
                  {Math.abs(statData.trend)}%
                </>
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{statData.title}</h2>
          <div className="text-4xl font-bold mb-2" style={{ color: statData.color }}>
            {statData.value.toLocaleString()}
          </div>
          <p className="text-lg text-gray-600">{statData.subtitle}</p>
        </div>

        {/* Related Graphs */}
        {relatedData?.graphs && relatedData.graphs.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Related Visualizations</h4>
            <div className="grid gap-4">
              {relatedData.graphs.map((graph) => (
                <div key={graph.id} className="bg-white border rounded-lg p-4">
                  <h5 className="font-medium mb-3">{graph.title}</h5>
                  <div className="h-48 border rounded bg-gray-50 flex items-center justify-center">
                    <Graph 
                      data={graph.data}
                      categoryKey="x"
                      dataKey="y"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="text-md font-semibold mb-3">Performance Analysis</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Value:</span>
                <span className="font-medium">{statData.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Trend:</span>
                <span className={`font-medium ${
                  statData.trendDirection === 'up' ? 'text-green-600' : 
                  statData.trendDirection === 'down' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {statData.trend || 0}% {statData.trendDirection || 'neutral'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  statData.trendDirection === 'up' ? 'bg-green-100 text-green-800' : 
                  statData.trendDirection === 'down' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {statData.trendDirection === 'up' ? 'Growing' : 
                   statData.trendDirection === 'down' ? 'Declining' : 'Stable'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="font-medium">{statData.id.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">📊 Drill-Down Analysis: {title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {['overview', 'data', 'analysis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'overview' | 'data' | 'analysis')}
              className={`px-6 py-3 font-medium capitalize ${
                activeTab === tab 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'overview' && (
            <div>
              {type === 'graph' && renderGraphAnalysis(data as GraphData)}
              {type === 'stat' && renderStatAnalysis(data as StatCardData)}
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Raw Data Export</h3>
              <div className="bg-gray-50 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          {activeTab === 'analysis' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Advanced Analysis</h3>
              <p className="text-gray-600">
                This section would contain advanced analytics, correlations, and insights
                based on the selected data. Features might include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Trend analysis and forecasting</li>
                <li>Correlation with other metrics</li>
                <li>Anomaly detection</li>
                <li>Comparative analysis</li>
                <li>Export to various formats</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrillDownModal;