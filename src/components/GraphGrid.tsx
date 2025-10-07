'use client';

import React from 'react';
import { GraphData } from '@/data/sampleData';

interface GraphGridProps {
  graphs: GraphData[];
  onGraphClick: (graphId: string) => void;
}

// Enhanced chart component that looks more like real charts
const MockGraph: React.FC<{ data: Array<{x: string | number; y: number; label?: string}>; type: string; color?: string }> = ({ data, type, color = '#3B82F6' }) => {
  const maxValue = Math.max(...data.map(d => d.y));
  const chartHeight = 200;
  const chartWidth = 350;
  
  const renderChart = () => {
    switch (type) {
      case 'line': {
        const points = data.map((point, index) => ({
          x: (index / (data.length - 1)) * chartWidth,
          y: chartHeight - (point.y / maxValue) * (chartHeight - 40)
        }));
        const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
        
        return (
          <svg width={chartWidth} height={chartHeight} className="w-full h-full">
            <defs>
              <linearGradient id={`lineGradient-${type}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.1" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => (
              <line key={`line-grid-${type}-${i}`} x1="0" y1={i * (chartHeight / 4)} x2={chartWidth} y2={i * (chartHeight / 4)} 
                    stroke="#e5e7eb" strokeWidth="1" />
            ))}
            
            {/* Area fill */}
            <path d={`${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} 
                  fill={`url(#lineGradient-${type})`} />
            
            {/* Line */}
            <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Data points */}
            {points.map((point, index) => (
              <circle key={`${type}-point-${point.x}-${point.y}`} cx={point.x} cy={point.y} r="4" fill={color} />
            ))}
            
            {/* Labels */}
            {data.map((point, idx) => (
              <text key={`${type}-label-${point.x}`} x={(idx / (data.length - 1)) * chartWidth} y={chartHeight + 15} 
                    textAnchor="middle" className="text-xs fill-gray-600">
                {point.x}
              </text>
            ))}
          </svg>
        );
      }
        
      case 'bar': {
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length * 0.2;
        
        return (
          <svg width={chartWidth} height={chartHeight} className="w-full h-full">
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => (
              <line key={`bar-grid-${type}-${i}`} x1="0" y1={i * (chartHeight / 4)} x2={chartWidth} y2={i * (chartHeight / 4)} 
                    stroke="#e5e7eb" strokeWidth="1" />
            ))}
            
            {data.map((point, index) => {
              const barHeight = (point.y / maxValue) * (chartHeight - 40);
              const x = index * (barWidth + barSpacing) + barSpacing / 2;
              
              return (
                <g key={`${type}-bar-${point.x}-${point.y}`}>
                  <rect 
                    x={x} 
                    y={chartHeight - barHeight - 20} 
                    width={barWidth} 
                    height={barHeight}
                    fill={color}
                    rx="4"
                    className="hover:opacity-80 transition-opacity"
                  />
                  <text x={x + barWidth/2} y={chartHeight - 5} 
                        textAnchor="middle" className="text-xs fill-gray-600">
                    {point.x}
                  </text>
                  <text x={x + barWidth/2} y={chartHeight - barHeight - 25} 
                        textAnchor="middle" className="text-xs fill-gray-800 font-medium">
                    {point.y}
                  </text>
                </g>
              );
            })}
          </svg>
        );
      }
        
      case 'pie': {
        const total = data.reduce((sum, d) => sum + d.y, 0);
        let currentAngle = 0;
        const radius = 80;
        const centerX = chartWidth / 2;
        const centerY = chartHeight / 2;
        
        return (
          <svg width={chartWidth} height={chartHeight} className="w-full h-full">
            {data.map((point, index) => {
              const percentage = point.y / total;
              const angle = percentage * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              const sliceColor = `hsl(${200 + index * 30}, 70%, ${60 - index * 5}%)`;
              
              return (
                <path key={`${type}-pie-${point.x}-${point.y}`} d={pathData} fill={sliceColor} 
                      className="hover:opacity-80 transition-opacity" />
              );
            })}
            
            {/* Center circle */}
            <circle cx={centerX} cy={centerY} r="30" fill="white" />
            <text x={centerX} y={centerY + 5} textAnchor="middle" className="text-sm font-medium fill-gray-800">
              {data.length} items
            </text>
          </svg>
        );
      }
        
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm">Chart</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-48 bg-white border border-gray-200 rounded-lg p-4">
      {renderChart()}
    </div>
  );
};

export const GraphGrid: React.FC<GraphGridProps> = ({ graphs, onGraphClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {graphs.map((graph) => (
        <button
          key={graph.id}
          onClick={() => onGraphClick(graph.id)}
          className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-0 border-0 bg-transparent text-left"
          aria-label={`View details for ${graph.title}`}
        >
          <div className="h-full border-2 border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{graph.title}</h3>
            <MockGraph
              data={graph.data}
              type={graph.type}
              color={graph.color}
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default GraphGrid;