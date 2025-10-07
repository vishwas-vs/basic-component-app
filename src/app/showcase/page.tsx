'use client';

import React, { useState } from 'react';
import { StatsGrid } from '@/components/StatsGrid';
import { GraphGrid } from '@/components/GraphGrid';
import { DetailsList } from '@/components/DetailsList';
import { EnhancedGraphGrid } from '@/components/EnhancedGraphGrid';
import { EnhancedDetailsList } from '@/components/EnhancedDetailsList';
import { Navigation } from '@/components/Navigation';
import { 
  dashboardStats, 
  graphDataMap, 
  listViewDataMap 
} from '@/data/sampleData';
import { DrillDownState, NavigationHistory } from '@/types/navigation';

export default function ShowcasePage() {
  const [drillDownState, setDrillDownState] = useState<DrillDownState>({
    level: 'dashboard'
  });
  
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistory>({});
  const [showEnhanced, setShowEnhanced] = useState(false);

  const handleStatClick = (statId: string) => {
    const selectedStat = dashboardStats.find(stat => stat.id === statId);
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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Component Showcase Dashboard
              </h1>
              <div className="text-sm text-gray-600">
                Click on any stat card to explore graphs and detailed data
              </div>
            </div>
            
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                🎯 Bit Components Integrated
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-blue-800">Stat Cards</h3>
                  <p className="text-blue-700">@shrijulvenkatesh/ds-pesu.stat-card</p>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">Graphs</h3>
                  <p className="text-blue-700">@shrijulvenkatesh/ds-pesu.graph</p>
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">List Views</h3>
                  <p className="text-blue-700">@shrijulvenkatesh/ds-pesu.list-view</p>
                </div>
              </div>
            </div>

            <StatsGrid stats={dashboardStats} onStatClick={handleStatClick} />
          </div>
        );
      }
      
      case 'graphs': {
        if (!drillDownState.selectedStat) return null;
        const graphs = graphDataMap[drillDownState.selectedStat] || [];
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {navigationHistory.statTitle} - Analytics
              </h1>
              <button
                onClick={() => setShowEnhanced(!showEnhanced)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showEnhanced ? 'Show Simple View' : 'Show Enhanced View'}
              </button>
            </div>
            
            {showEnhanced ? (
              <EnhancedGraphGrid graphs={graphs} onGraphClick={handleGraphClick} />
            ) : (
              <GraphGrid graphs={graphs} onGraphClick={handleGraphClick} />
            )}
          </div>
        );
      }
      
      case 'details': {
        if (!drillDownState.selectedGraph) return null;
        const listItems = listViewDataMap[drillDownState.selectedGraph] || [];
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {navigationHistory.graphTitle} - Details
              </h1>
              <button
                onClick={() => setShowEnhanced(!showEnhanced)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showEnhanced ? 'Show Simple View' : 'Show Enhanced View'}
              </button>
            </div>
            
            {showEnhanced ? (
              <EnhancedDetailsList 
                items={listItems} 
                title={`${navigationHistory.graphTitle} Data`}
              />
            ) : (
              <DetailsList 
                items={listItems} 
                title={`${navigationHistory.graphTitle} Data`}
              />
            )}
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
        <Navigation
          history={navigationHistory}
          onBackToDashboard={handleBackToDashboard}
          onBackToGraphs={handleBackToGraphs}
          currentLevel={drillDownState.level}
        />
        
        {renderContent()}
        
        {/* Footer with info */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <p>
              Featuring Bit components from @shrijulvenkatesh/ds-pesu design system
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}