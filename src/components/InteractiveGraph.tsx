'use client';

import React, { useState, useEffect } from 'react';
import { Graph } from '@shrijulvenkatesh/ds-pesu.graph';
import { GraphData } from '@/data/sampleData';

interface InteractiveGraphProps {
  graph: GraphData;
  onGraphClick: (graphId: string) => void;
  variant?: 'basic' | 'intermediate' | 'advanced';
}

// Basic Graph Component - Simple implementation
const BasicGraph: React.FC<{ graph: GraphData; onGraphClick: (id: string) => void }> = ({ graph, onGraphClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{graph.title} (Basic)</h3>
      <div className="h-64 flex items-center justify-center border rounded bg-gray-50">
        <Graph 
          data={graph.data}
          categoryKey="x"
          dataKey="y"
        />
      </div>
      
      {/* Drill-down info */}
      <div className="mt-3 text-sm text-gray-600">
        Data Points: {graph.data.length} | Type: {graph.type.toUpperCase()}
      </div>
      
      <button 
        onClick={() => onGraphClick(graph.id)}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        📊 Drill Down for Details
      </button>
    </div>
  );
};

// Intermediate Graph Component - With basic interactivity
const IntermediateGraph: React.FC<{ graph: GraphData; onGraphClick: (id: string) => void }> = ({ graph, onGraphClick }) => {
  const [filteredData, setFilteredData] = useState(graph.data);
  const [showValues, setShowValues] = useState(true);
  const [minValueFilter, setMinValueFilter] = useState(0);

  const handleDataFilter = (minValue: number) => {
    setMinValueFilter(minValue);
    const filtered = graph.data.filter(item => item.y >= minValue);
    setFilteredData(filtered);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{graph.title} (Intermediate)</h3>
      
      {/* Controls */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-4">
          <label htmlFor="minValue" className="text-sm font-medium">Min Value:</label>
          <input 
            id="minValue"
            type="range" 
            min="0" 
            max={Math.max(...graph.data.map(d => d.y))} 
            step="100"
            value={minValueFilter}
            onChange={(e) => handleDataFilter(Number(e.target.value))}
            className="flex-1"
            title="Set minimum value filter"
          />
          <span className="text-sm font-medium min-w-[60px]">{minValueFilter}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <label htmlFor="showValues" className="flex items-center gap-2 text-sm">
            <input 
              id="showValues"
              type="checkbox" 
              checked={showValues}
              onChange={(e) => setShowValues(e.target.checked)}
            />
            Show Values
          </label>
        </div>
      </div>

      <div className="h-64 flex items-center justify-center border rounded bg-gray-50">
        <Graph 
          data={filteredData}
          categoryKey="x"
          dataKey="y"
        />
      </div>
      
      {/* Drill-down statistics */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-blue-50 p-2 rounded text-center">
          <div className="font-semibold text-blue-700">Filtered</div>
          <div className="text-blue-600">{filteredData.length}</div>
        </div>
        <div className="bg-green-50 p-2 rounded text-center">
          <div className="font-semibold text-green-700">Average</div>
          <div className="text-green-600">
            {filteredData.length > 0 ? Math.round(filteredData.reduce((sum, d) => sum + d.y, 0) / filteredData.length) : 0}
          </div>
        </div>
        <div className="bg-purple-50 p-2 rounded text-center">
          <div className="font-semibold text-purple-700">Max</div>
          <div className="text-purple-600">
            {filteredData.length > 0 ? Math.max(...filteredData.map(d => d.y)) : 0}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onGraphClick(graph.id)}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition-colors"
      >
        🔍 Drill Down Analysis ({filteredData.length} items)
      </button>
    </div>
  );
};

// Advanced Graph Component with vertical and horizontal sliders
const AdvancedGraph: React.FC<{ graph: GraphData; onGraphClick: (id: string) => void }> = ({ graph, onGraphClick }) => {
  const [currentData, setCurrentData] = useState(graph.data);
  const [timeRange, setTimeRange] = useState([0, graph.data.length - 1]);
  const [valueRange, setValueRange] = useState([0, Math.max(...graph.data.map(d => d.y))]);
  const [showGrid, setShowGrid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  
  const maxValue = Math.max(...graph.data.map(d => d.y));
  const maxIndex = graph.data.length - 1;

  useEffect(() => {
    const filtered = graph.data
      .slice(timeRange[0], timeRange[1] + 1)
      .filter(item => item.y >= valueRange[0] && item.y <= valueRange[1]);
    setCurrentData(filtered);
  }, [timeRange, valueRange, graph.data]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{graph.title} (Advanced with Vertical & Horizontal Sliders)</h3>
        <button 
          onClick={() => onGraphClick(graph.id)}
          className="bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
      
      <div className="flex gap-6">
        {/* Vertical Sliders Section */}
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-medium mb-4">Value Range (Vertical Sliders)</h4>
          <div className="flex gap-6 h-64">
            <div className="flex flex-col items-center">
              <label htmlFor="minValueVertical" className="text-xs mb-2">Min</label>
              <div className="relative h-48">
                <input 
                  id="minValueVertical"
                  type="range" 
                  min="0" 
                  max={maxValue}
                  value={valueRange[0]}
                  onChange={(e) => setValueRange([Number(e.target.value), valueRange[1]])}
                  className="vertical-slider"
                  title={`Minimum value: ${valueRange[0]}`}
                />
              </div>
              <span className="text-xs mt-2">{valueRange[0]}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <label htmlFor="maxValueVertical" className="text-xs mb-2">Max</label>
              <div className="relative h-48">
                <input 
                  id="maxValueVertical"
                  type="range" 
                  min="0" 
                  max={maxValue}
                  value={valueRange[1]}
                  onChange={(e) => setValueRange([valueRange[0], Number(e.target.value)])}
                  className="vertical-slider"
                  title={`Maximum value: ${valueRange[1]}`}
                />
              </div>
              <span className="text-xs mt-2">{valueRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="flex-1">
          {/* Horizontal Sliders */}
          <div className="mb-4 space-y-3">
            <h4 className="text-sm font-medium">Time Range (Horizontal Sliders)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startRange" className="text-xs text-gray-600">Start Index</label>
                <input 
                  id="startRange"
                  type="range" 
                  min="0" 
                  max={maxIndex}
                  value={timeRange[0]}
                  onChange={(e) => setTimeRange([Number(e.target.value), timeRange[1]])}
                  className="w-full"
                  title={`Start index: ${timeRange[0]}`}
                />
                <div className="text-xs text-gray-600">{timeRange[0]}</div>
              </div>
              
              <div>
                <label htmlFor="endRange" className="text-xs text-gray-600">End Index</label>
                <input 
                  id="endRange"
                  type="range" 
                  min="0" 
                  max={maxIndex}
                  value={timeRange[1]}
                  onChange={(e) => setTimeRange([timeRange[0], Number(e.target.value)])}
                  className="w-full"
                  title={`End index: ${timeRange[1]}`}
                />
                <div className="text-xs text-gray-600">{timeRange[1]}</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 border rounded bg-gray-50 flex items-center justify-center">
            <Graph 
              data={currentData}
              categoryKey="x"
              dataKey="y"
            />
          </div>
          
          {/* Chart Options */}
          <div className="mt-4 flex gap-4">
            <label htmlFor="showGridCheck" className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                id="showGridCheck"
                type="checkbox" 
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              Show Grid
            </label>
            
            <label htmlFor="showTooltipAdvanced" className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                id="showTooltipAdvanced"
                type="checkbox" 
                checked={showTooltip}
                onChange={(e) => setShowTooltip(e.target.checked)}
              />
              Show Tooltips
            </label>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-6 grid grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 rounded p-3">
          <div className="text-sm font-medium">Data Points</div>
          <div className="text-lg text-blue-600">{currentData.length}</div>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <div className="text-sm font-medium">Average</div>
          <div className="text-lg text-green-600">
            {currentData.length > 0 ? Math.round(currentData.reduce((sum, d) => sum + d.y, 0) / currentData.length) : 0}
          </div>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <div className="text-sm font-medium">Min</div>
          <div className="text-lg text-orange-600">
            {currentData.length > 0 ? Math.min(...currentData.map(d => d.y)) : 0}
          </div>
        </div>
        <div className="bg-gray-50 rounded p-3">
          <div className="text-sm font-medium">Max</div>
          <div className="text-lg text-purple-600">
            {currentData.length > 0 ? Math.max(...currentData.map(d => d.y)) : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ 
  graph, 
  onGraphClick, 
  variant = 'basic' 
}) => {
  switch (variant) {
    case 'basic':
      return <BasicGraph graph={graph} onGraphClick={onGraphClick} />;
    case 'intermediate':
      return <IntermediateGraph graph={graph} onGraphClick={onGraphClick} />;
    case 'advanced':
      return <AdvancedGraph graph={graph} onGraphClick={onGraphClick} />;
    default:
      return <BasicGraph graph={graph} onGraphClick={onGraphClick} />;
  }
};

export default InteractiveGraph;