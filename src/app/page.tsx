'use client';

import React, { useState } from 'react';

import { DetailsList } from '@/components/DetailsList';
import { Navigation } from '@/components/Navigation';
import { DrillDownModal } from '@/components/DrillDownModal';
import { InteractiveGraph } from '@/components/InteractiveGraph';
import { 
  dashboardStats, 
  graphDataMap, 
  listViewDataMap,
  StatCardData,
  GraphData,
  ListViewItem
} from '@/data/sampleData';
import { DrillDownState, NavigationHistory } from '@/types/navigation';

export default function Home() {
  const [drillDownState, setDrillDownState] = useState<DrillDownState>({
    level: 'dashboard'
  });
  
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory>({});
  
  // Enhanced drill-down modal state
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
    const selectedStat = dashboardStats.find(stat => stat.id === statId);
    
    // Show drill-down modal for enhanced experience
    if (selectedStat) {
      setDrillDownModal({
        isOpen: true,
        type: 'stat',
        title: selectedStat.title,
        data: selectedStat,
        relatedData: {
          graphs: graphDataMap[statId] || [],
          lists: listViewDataMap[statId] || []
        }
      });
    }
    
    // Also update the traditional drill-down state for the dashboard layout
    setDrillDownState({
      level: 'graphs',
      selectedStat: statId
    });
    setNavigationHistory({
      statTitle: selectedStat?.title
    });
  };

  const handleGraphClick = (graphId: string) => {
    const currentGraphs = drillDownState.selectedStat ? graphDataMap[drillDownState.selectedStat] : [];
    const selectedGraph = currentGraphs.find(graph => graph.id === graphId);
    
    // Show drill-down modal for enhanced graph analysis
    if (selectedGraph) {
      setDrillDownModal({
        isOpen: true,
        type: 'graph',
        title: selectedGraph.title,
        data: selectedGraph,
        relatedData: {
          lists: drillDownState.selectedStat ? listViewDataMap[drillDownState.selectedStat] || [] : []
        }
      });
    }
    
    // Also update the traditional drill-down state
    setDrillDownState({
      level: 'details',
      selectedStat: drillDownState.selectedStat,
      selectedGraph: graphId
    });
    setNavigationHistory({
      ...navigationHistory,
      graphTitle: selectedGraph?.title
    });
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

  const handleBackToDashboard = () => {
    setDrillDownState({ level: 'dashboard' });
    setNavigationHistory({});
  };

  const handleBackToGraphs = () => {
    setDrillDownState({
      level: 'graphs',
      selectedStat: drillDownState.selectedStat
    });
    setNavigationHistory({
      statTitle: navigationHistory.statTitle
    });
  };

  const renderContent = () => {
    switch (drillDownState.level) {
      case 'dashboard': {
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Stats Grid - Left side */}
              <div className="xl:col-span-1">
                <div className="grid grid-cols-1 gap-4">
                  {dashboardStats.map((stat) => (
                    <button
                      key={stat.id}
                      onClick={() => handleStatClick(stat.id)}
                      className={`cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg p-0 border-0 bg-transparent text-left ${
                        drillDownState.selectedStat === stat.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      aria-label={`View details for ${stat.title}`}
                    >
                      <div className="h-full border-2 rounded-lg p-4 bg-white shadow-sm border-gray-200">
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
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Graphs - Center/Right side */}
              <div className="xl:col-span-3">
                {drillDownState.selectedStat ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {dashboardStats.find(s => s.id === drillDownState.selectedStat)?.title} Analytics
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {(graphDataMap[drillDownState.selectedStat] || []).map((graph) => (
                        <InteractiveGraph
                          key={graph.id}
                          graph={graph}
                          onGraphClick={handleGraphClick}
                          variant="intermediate"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="text-6xl text-gray-400 mb-4">📊</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Stat Card</h3>
                    <p className="text-gray-600">Click on any stat card on the left to view its analytics</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      
      case 'graphs': {
        if (!drillDownState.selectedStat) return null;
        const graphs = graphDataMap[drillDownState.selectedStat] || [];
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {navigationHistory.statTitle} - Analytics
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {graphs.map((graph) => (
                <InteractiveGraph
                  key={graph.id}
                  graph={graph}
                  onGraphClick={handleGraphClick}
                  variant="advanced"
                />
              ))}
            </div>
          </div>
        );
      }
      
      case 'details': {
        if (!drillDownState.selectedGraph) return null;
        const listItems = listViewDataMap[drillDownState.selectedGraph] || [];
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {navigationHistory.graphTitle} - Details
            </h1>
            <DetailsList 
              items={listItems} 
              title={`${navigationHistory.graphTitle} Data`}
            />
          </div>
        );
      }
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with navigation to showcase */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Basic Component App</h1>
            <p className="text-gray-600">Drill-down dashboard with Bit components</p>
          </div>
          <a
            href="/interactive"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            🎛️ Interactive Components Showcase
          </a>
        </div>

        <Navigation
          history={navigationHistory}
          onBackToDashboard={handleBackToDashboard}
          onBackToGraphs={handleBackToGraphs}
          currentLevel={drillDownState.level}
        />
        
        {renderContent()}
        
        {/* Enhanced Drill-down Modal */}
        <DrillDownModal
          isOpen={drillDownModal.isOpen}
          onClose={closeDrillDownModal}
          title={drillDownModal.title}
          type={drillDownModal.type}
          data={drillDownModal.data}
          relatedData={drillDownModal.relatedData}
        />
      </div>
    </div>
  );
}
