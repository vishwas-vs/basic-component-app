export interface DrillDownState {
  level: 'dashboard' | 'graphs' | 'details';
  selectedStat?: string;
  selectedGraph?: string;
}

export interface NavigationHistory {
  statTitle?: string;
  graphTitle?: string;
}