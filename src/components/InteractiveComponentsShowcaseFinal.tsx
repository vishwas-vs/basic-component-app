'use client';

import React, { useState } from 'react';
import { InteractiveGraph } from '@/components/InteractiveGraph';
import { DrillDownModal } from '@/components/DrillDownModal';
import { dashboardStats, graphDataMap, listViewDataMap, ListViewItem, StatCardData, GraphData } from '@/data/sampleData';
import '../styles/interactive-components.css';

const InteractiveComponentsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'graphs' | 'stats' | 'lists'>('overview');
  const [drillDownModal, setDrillDownModal] = useState<{
    isOpen: boolean;
    type: 'graph' | 'stat' | 'list';
    title: string;
    data: StatCardData | GraphData | ListViewItem[] | null;
    relatedData?: {
      graphs?: GraphData[];
      lists?: ListViewItem[];
      stats?: StatCardData[];
    };
  }>({
    isOpen: false,
    type: 'graph',
    title: '',
    data: null,
    relatedData: undefined
  });

  const handleStatClick = (statId: string) => {
    console.log('Stat clicked:', statId);
    const stat = dashboardStats.find(s => s.id === statId);
    if (stat) {
      setDrillDownModal({
        isOpen: true,
        type: 'stat',
        title: stat.title,
        data: stat,
        relatedData: {
          graphs: graphDataMap[statId] || [],
          lists: listViewDataMap[statId] || []
        }
      });
    }
  };

  const handleGraphClick = (graphId: string) => {
    console.log('Graph clicked:', graphId);
    // Find the graph data from all available graphs
    let foundGraph = null;
    let foundStatId = null;
    
    for (const [statId, graphs] of Object.entries(graphDataMap)) {
      const graph = graphs.find(g => g.id === graphId);
      if (graph) {
        foundGraph = graph;
        foundStatId = statId;
        break;
      }
    }
    
    if (foundGraph) {
      setDrillDownModal({
        isOpen: true,
        type: 'graph',
        title: foundGraph.title,
        data: foundGraph,
        relatedData: {
          lists: foundStatId ? listViewDataMap[foundStatId] || [] : []
        }
      });
    }
  };

  const closeDrillDownModal = () => {
    setDrillDownModal({
      isOpen: false,
      type: 'graph',
      title: '',
      data: null,
      relatedData: undefined
    });
  };

  // Custom StatCard component since the Bit component has unknown props
  const CustomStatCard = ({ stat, onClick, isSelected = false, showCheckbox = false, onSelect }: {
    stat: StatCardData;
    onClick: () => void;
    isSelected?: boolean;
    showCheckbox?: boolean;
    onSelect?: (selected: boolean) => void;
  }) => {
    return (
      <div className={`relative transition-all duration-200 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <div 
          onClick={onClick}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <div className={`text-sm font-medium ${
              stat.trendDirection === 'up' ? 'text-green-600' : 
              stat.trendDirection === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {stat.trend !== undefined && stat.trend !== 0 && (
                <>
                  {stat.trendDirection === 'up' ? '↑' : stat.trendDirection === 'down' ? '↓' : '→'}
                  {Math.abs(stat.trend)}%
                </>
              )}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold mb-1 text-gray-900">
            {stat.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p className="text-sm text-gray-600">{stat.subtitle}</p>
        </div>
        
        {showCheckbox && (
          <div className="absolute top-2 right-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect?.(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
              title={`Select ${stat.title}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    );
  };

  // Custom StatCard implementations
  const BasicStatCards = ({ stats, onStatClick }: { stats: StatCardData[]; onStatClick: (id: string) => void }) => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Stat Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <CustomStatCard
              key={stat.id}
              stat={stat}
              onClick={() => onStatClick(stat.id)}
            />
          ))}
        </div>
      </div>
    );
  };

  const IntermediateStatCards = ({ stats, onStatClick }: { stats: StatCardData[]; onStatClick: (id: string) => void }) => {
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const handleCardSelect = (statId: string, selected: boolean) => {
      setSelectedCards(prev => 
        selected ? [...prev, statId] : prev.filter(id => id !== statId)
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Intermediate Stat Cards with Selection</h3>
          <div className="text-sm text-gray-600">
            {selectedCards.length} of {stats.length} selected
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <CustomStatCard
              key={stat.id}
              stat={stat}
              onClick={() => onStatClick(stat.id)}
              isSelected={selectedCards.includes(stat.id)}
              showCheckbox={true}
              onSelect={(selected) => handleCardSelect(stat.id, selected)}
            />
          ))}
        </div>
        
        {selectedCards.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Selected cards: {selectedCards.map(id => stats.find(s => s.id === id)?.title).join(', ')}
            </p>
            <button
              onClick={() => setSelectedCards([])}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Clear selection
            </button>
          </div>
        )}
      </div>
    );
  };

  const AdvancedStatCards = ({ stats, onStatClick }: { stats: StatCardData[]; onStatClick: (id: string) => void }) => {
    const [displayMode, setDisplayMode] = useState<'grid' | 'list' | 'compact'>('grid');
    const [sortBy, setSortBy] = useState<'title' | 'value' | 'trend'>('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterByTrend, setFilterByTrend] = useState<'all' | 'up' | 'down' | 'neutral'>('all');
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    // Sort and filter stats
    const processedStats = stats
      .filter(stat => {
        if (filterByTrend === 'all') return true;
        return stat.trendDirection === filterByTrend;
      })
      .sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'value':
            aValue = a.value;
            bValue = b.value;
            break;
          case 'trend':
            aValue = a.trend || 0;
            bValue = b.trend || 0;
            break;
          default:
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
        }
        
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

    const handleSelectAll = () => {
      if (selectedCards.length === processedStats.length) {
        setSelectedCards([]);
      } else {
        setSelectedCards(processedStats.map(stat => stat.id));
      }
    };

    const exportSelected = () => {
      const selectedData = processedStats.filter(stat => selectedCards.includes(stat.id));
      const csvContent = [
        ['Title', 'Value', 'Subtitle', 'Trend', 'Trend Direction'].join(','),
        ...selectedData.map(stat => [
          `"${stat.title}"`,
          stat.value,
          `"${stat.subtitle}"`,
          stat.trend || 0,
          `"${stat.trendDirection || 'neutral'}"`
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stat-cards-data.csv';
      a.click();
      URL.revokeObjectURL(url);
    };

    const getGridClass = () => {
      switch (displayMode) {
        case 'grid':
          return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
        case 'list':
          return 'space-y-3';
        case 'compact':
          return 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2';
        default:
          return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Advanced Stat Cards with Full Controls</h3>
          <div className="flex gap-2">
            <button
              onClick={exportSelected}
              disabled={selectedCards.length === 0}
              className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              Export Selected ({selectedCards.length})
            </button>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-800">Display & Filter Controls</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Display Mode */}
            <div>
              <label htmlFor="displayMode" className="block text-sm font-medium mb-1">Layout</label>
              <select
                id="displayMode"
                value={displayMode}
                onChange={(e) => setDisplayMode(e.target.value as 'grid' | 'list' | 'compact')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="grid">Grid View</option>
                <option value="list">List View</option>
                <option value="compact">Compact Grid</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium mb-1">Sort By</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'value' | 'trend')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="title">Title</option>
                <option value="value">Value</option>
                <option value="trend">Trend</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">Order</label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Filter by Trend */}
            <div>
              <label htmlFor="filterByTrend" className="block text-sm font-medium mb-1">Filter by Trend</label>
              <select
                id="filterByTrend"
                value={filterByTrend}
                onChange={(e) => setFilterByTrend(e.target.value as 'all' | 'up' | 'down' | 'neutral')}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Trends</option>
                <option value="up">Trending Up</option>
                <option value="down">Trending Down</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex gap-4 items-center pt-2 border-t">
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {selectedCards.length === processedStats.length && processedStats.length > 0 
                ? 'Deselect All' 
                : 'Select All'
              }
            </button>
            
            <span className="text-sm text-gray-600">
              {selectedCards.length} of {processedStats.length} selected
            </span>
          </div>
        </div>

        {/* Stat Cards Display */}
        <div className={getGridClass()}>
          {processedStats.map((stat) => (
            <CustomStatCard
              key={stat.id}
              stat={stat}
              onClick={() => onStatClick(stat.id)}
              isSelected={selectedCards.includes(stat.id)}
              showCheckbox={true}
              onSelect={(selected) => {
                setSelectedCards(prev => 
                  selected ? [...prev, stat.id] : prev.filter(id => id !== stat.id)
                );
              }}
            />
          ))}
        </div>

        {processedStats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No stat cards match your current filter criteria
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded p-3">
            <div className="text-sm font-medium text-blue-800">Total Cards</div>
            <div className="text-lg text-blue-600">{processedStats.length}</div>
          </div>
          <div className="bg-green-50 rounded p-3">
            <div className="text-sm font-medium text-green-800">Selected</div>
            <div className="text-lg text-green-600">{selectedCards.length}</div>
          </div>
          <div className="bg-purple-50 rounded p-3">
            <div className="text-sm font-medium text-purple-800">Trending Up</div>
            <div className="text-lg text-purple-600">
              {processedStats.filter(s => s.trendDirection === 'up').length}
            </div>
          </div>
          <div className="bg-orange-50 rounded p-3">
            <div className="text-sm font-medium text-orange-800">Avg Value</div>
            <div className="text-lg text-orange-600">
              {processedStats.length > 0 
                ? Math.round(processedStats.reduce((sum, s) => sum + s.value, 0) / processedStats.length)
                : 0
              }
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Simple list component that doesn't use the ListView Bit component
  const SimpleListView = ({ items, title, variant }: { items: ListViewItem[]; title: string; variant: string }) => {
    const [filteredItems, setFilteredItems] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
      setSearchTerm(term);
      const filtered = items.filter(item => 
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredItems(filtered);
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{title} ({variant} List View)</h3>
        
        {variant !== 'Basic' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="h-64 overflow-auto space-y-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                  )}
                  {item.value && (
                    <p className="text-sm font-medium text-blue-600 mt-1">
                      Value: {item.value}
                    </p>
                  )}
                </div>
                {item.status && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' :
                    item.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                )}
              </div>
              
              {variant === 'Advanced' && item.metadata && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <h5 className="text-xs font-medium text-gray-700 mb-2">Metadata:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-3 text-sm text-gray-600">
          Showing {filteredItems.length} of {items.length} items
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Interactive Bit Components Showcase
              </h1>
              <p className="text-gray-600 mt-1">
                Basic, Intermediate & Advanced implementations with interactive features
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'graphs', label: 'Interactive Graphs' },
              { key: 'stats', label: 'Stat Cards' },
              { key: 'lists', label: 'List Views' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Component Implementation Levels
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                This showcase demonstrates three levels of implementation for each component type:
                <strong> Basic</strong> (simple usage), <strong>Intermediate</strong> (with interactivity), 
                and <strong>Advanced</strong> (with comprehensive features and controls).
              </p>
            </div>

            {/* Quick Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stat Cards Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Stat Cards</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Basic:</strong> Simple display with click handling
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Intermediate:</strong> With selection & hover effects
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Advanced:</strong> Full controls, sorting, filtering, export
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('stats')}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  View Stat Cards
                </button>
              </div>

              {/* Graphs Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Interactive Graphs</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Basic:</strong> Simple bar chart with Graph component
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Intermediate:</strong> With horizontal slider controls
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Advanced:</strong> Vertical & horizontal sliders, statistics
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('graphs')}
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                >
                  View Interactive Graphs
                </button>
              </div>

              {/* Lists Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">List Views</h3>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Basic:</strong> Simple list display
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Intermediate:</strong> With search & filtering
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Advanced:</strong> With metadata display
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('lists')}
                  className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
                >
                  View List Views
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'graphs' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interactive Graph Components
              </h2>
              <p className="text-lg text-gray-600">
                Demonstrating basic bar charts, charts with slider components, and advanced implementations with vertical and horizontal sliders.
              </p>
            </div>

            <div className="space-y-8">
              <InteractiveGraph 
                graph={graphDataMap.sales[0]} 
                onGraphClick={handleGraphClick} 
                variant="basic" 
              />
              
              <InteractiveGraph 
                graph={graphDataMap.sales[1]} 
                onGraphClick={handleGraphClick} 
                variant="intermediate" 
              />
              
              <InteractiveGraph 
                graph={graphDataMap.users[0]} 
                onGraphClick={handleGraphClick} 
                variant="advanced" 
              />
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interactive Stat Card Components
              </h2>
              <p className="text-lg text-gray-600">
                From basic display to advanced implementations with selection, sorting, and export capabilities.
              </p>
            </div>

            <div className="space-y-12">
              <BasicStatCards 
                stats={dashboardStats} 
                onStatClick={handleStatClick} 
              />
              
              <IntermediateStatCards 
                stats={dashboardStats} 
                onStatClick={handleStatClick} 
              />
              
              <AdvancedStatCards 
                stats={dashboardStats} 
                onStatClick={handleStatClick} 
              />
            </div>
          </div>
        )}

        {activeTab === 'lists' && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                List View Components
              </h2>
              <p className="text-lg text-gray-600">
                Custom list implementations with search, filtering, and metadata display functionality.
              </p>
            </div>

            <div className="space-y-12">
              <SimpleListView 
                items={listViewDataMap['sales-line']} 
                title="Sales Data" 
                variant="Basic" 
              />
              
              <SimpleListView 
                items={listViewDataMap['sales-bar']} 
                title="Product Data" 
                variant="Intermediate" 
              />
              
              <SimpleListView 
                items={listViewDataMap['users-area']} 
                title="User Analytics" 
                variant="Advanced" 
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Interactive Bit Components Showcase</p>
            <p className="text-sm mt-2">
              Demonstrating basic, intermediate, and advanced implementations of interactive components with drill-down functionality
            </p>
          </div>
        </div>
      </footer>

      {/* Drill-down Modal */}
      <DrillDownModal
        isOpen={drillDownModal.isOpen}
        onClose={closeDrillDownModal}
        title={drillDownModal.title}
        type={drillDownModal.type}
        data={drillDownModal.data}
        relatedData={drillDownModal.relatedData}
      />
    </div>
  );
};

export default InteractiveComponentsShowcase;