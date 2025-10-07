// Sample data for the drill-down application
export interface StatCardData {
  id: string;
  title: string;
  value: number;
  subtitle: string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: string;
  color?: string;
}

export interface GraphDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface GraphData {
  id: string;
  title: string;
  data: GraphDataPoint[];
  type: 'line' | 'bar' | 'pie' | 'area';
  color?: string;
}

export interface ListViewItem {
  id: string;
  title: string;
  subtitle?: string;
  value?: string | number;
  metadata?: Record<string, string | number | boolean>;
  avatar?: string;
  status?: 'active' | 'inactive' | 'pending';
}

// Main dashboard stat cards
export const dashboardStats: StatCardData[] = [
  {
    id: 'sales',
    title: 'Total Sales',
    value: 125000,
    subtitle: 'This month',
    trend: 12.5,
    trendDirection: 'up',
    color: '#3B82F6',
    icon: '💰'
  },
  {
    id: 'users',
    title: 'Active Users',
    value: 8547,
    subtitle: 'Currently online',
    trend: -2.3,
    trendDirection: 'down',
    color: '#10B981',
    icon: '👥'
  },
  {
    id: 'revenue',
    title: 'Monthly Revenue',
    value: 67890,
    subtitle: 'Last 30 days',
    trend: 8.2,
    trendDirection: 'up',
    color: '#8B5CF6',
    icon: '📈'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: 1234,
    subtitle: 'This week',
    trend: 0,
    trendDirection: 'neutral',
    color: '#F59E0B',
    icon: '📦'
  }
];

// Graph data for each stat card
export const graphDataMap: Record<string, GraphData[]> = {
  sales: [
    {
      id: 'sales-line',
      title: 'Sales Trend (Line Chart)',
      type: 'line',
      color: '#3B82F6',
      data: [
        { x: 'Jan', y: 4000 },
        { x: 'Feb', y: 3000 },
        { x: 'Mar', y: 5000 },
        { x: 'Apr', y: 4500 },
        { x: 'May', y: 6000 },
        { x: 'Jun', y: 5500 },
        { x: 'Jul', y: 7000 }
      ]
    },
    {
      id: 'sales-bar',
      title: 'Monthly Sales (Bar Chart)',
      type: 'bar',
      color: '#3B82F6',
      data: [
        { x: 'Product A', y: 2500 },
        { x: 'Product B', y: 1800 },
        { x: 'Product C', y: 3200 },
        { x: 'Product D', y: 2100 },
        { x: 'Product E', y: 2800 }
      ]
    },
    {
      id: 'sales-pie',
      title: 'Sales by Region (Pie Chart)',
      type: 'pie',
      color: '#3B82F6',
      data: [
        { x: 'North', y: 35, label: 'North (35%)' },
        { x: 'South', y: 25, label: 'South (25%)' },
        { x: 'East', y: 20, label: 'East (20%)' },
        { x: 'West', y: 20, label: 'West (20%)' }
      ]
    }
  ],
  users: [
    {
      id: 'users-area',
      title: 'User Growth (Area Chart)',
      type: 'area',
      color: '#10B981',
      data: [
        { x: 'Q1', y: 1200 },
        { x: 'Q2', y: 1900 },
        { x: 'Q3', y: 3000 },
        { x: 'Q4', y: 5000 },
        { x: 'Q5', y: 6500 },
        { x: 'Q6', y: 8500 }
      ]
    },
    {
      id: 'users-bar',
      title: 'Users by Device (Bar Chart)',
      type: 'bar',
      color: '#10B981',
      data: [
        { x: 'Desktop', y: 4200 },
        { x: 'Mobile', y: 3100 },
        { x: 'Tablet', y: 1247 }
      ]
    }
  ],
  revenue: [
    {
      id: 'revenue-line',
      title: 'Revenue Trend (Line Chart)',
      type: 'line',
      color: '#8B5CF6',
      data: [
        { x: 'Week 1', y: 15000 },
        { x: 'Week 2', y: 18000 },
        { x: 'Week 3', y: 12000 },
        { x: 'Week 4', y: 22000 }
      ]
    },
    {
      id: 'revenue-pie',
      title: 'Revenue Sources (Pie Chart)',
      type: 'pie',
      color: '#8B5CF6',
      data: [
        { x: 'Subscriptions', y: 45, label: 'Subscriptions (45%)' },
        { x: 'One-time', y: 30, label: 'One-time (30%)' },
        { x: 'Upgrades', y: 25, label: 'Upgrades (25%)' }
      ]
    }
  ],
  orders: [
    {
      id: 'orders-bar',
      title: 'Daily Orders (Bar Chart)',
      type: 'bar',
      color: '#F59E0B',
      data: [
        { x: 'Mon', y: 180 },
        { x: 'Tue', y: 220 },
        { x: 'Wed', y: 160 },
        { x: 'Thu', y: 240 },
        { x: 'Fri', y: 200 },
        { x: 'Sat', y: 120 },
        { x: 'Sun', y: 112 }
      ]
    }
  ]
};

// List view data for each graph
export const listViewDataMap: Record<string, ListViewItem[]> = {
  'sales-line': [
    {
      id: '1',
      title: 'January Sales',
      subtitle: 'Q1 Performance',
      value: '$4,000',
      status: 'active',
      metadata: { growth: '+5%', region: 'North America' }
    },
    {
      id: '2',
      title: 'February Sales',
      subtitle: 'Q1 Performance',
      value: '$3,000',
      status: 'inactive',
      metadata: { growth: '-10%', region: 'Europe' }
    },
    {
      id: '3',
      title: 'March Sales',
      subtitle: 'Q1 Performance',
      value: '$5,000',
      status: 'active',
      metadata: { growth: '+25%', region: 'Asia Pacific' }
    },
    {
      id: '4',
      title: 'April Sales',
      subtitle: 'Q2 Performance',
      value: '$4,500',
      status: 'active',
      metadata: { growth: '+12%', region: 'North America' }
    },
    {
      id: '5',
      title: 'May Sales',
      subtitle: 'Q2 Performance',
      value: '$6,000',
      status: 'active',
      metadata: { growth: '+20%', region: 'Europe' }
    }
  ],
  'sales-bar': [
    {
      id: '1',
      title: 'Product A Details',
      subtitle: 'Electronics Category',
      value: '$2,500',
      status: 'active',
      metadata: { inventory: 150, rating: 4.5 }
    },
    {
      id: '2',
      title: 'Product B Details',
      subtitle: 'Home & Garden',
      value: '$1,800',
      status: 'pending',
      metadata: { inventory: 75, rating: 4.2 }
    },
    {
      id: '3',
      title: 'Product C Details',
      subtitle: 'Fashion',
      value: '$3,200',
      status: 'active',
      metadata: { inventory: 200, rating: 4.8 }
    }
  ],
  'sales-pie': [
    {
      id: '1',
      title: 'North Region',
      subtitle: 'Regional Performance',
      value: '35%',
      status: 'active',
      metadata: { cities: 12, topCity: 'New York' }
    },
    {
      id: '2',
      title: 'South Region',
      subtitle: 'Regional Performance',
      value: '25%',
      status: 'active',
      metadata: { cities: 8, topCity: 'Miami' }
    },
    {
      id: '3',
      title: 'East Region',
      subtitle: 'Regional Performance',
      value: '20%',
      status: 'pending',
      metadata: { cities: 6, topCity: 'Boston' }
    },
    {
      id: '4',
      title: 'West Region',
      subtitle: 'Regional Performance',
      value: '20%',
      status: 'active',
      metadata: { cities: 10, topCity: 'Los Angeles' }
    }
  ],
  'users-area': [
    {
      id: '1',
      title: 'Q1 User Growth',
      subtitle: 'New Registrations',
      value: '1,200',
      status: 'active',
      metadata: { conversion: '12%', source: 'Organic' }
    },
    {
      id: '2',
      title: 'Q2 User Growth',
      subtitle: 'New Registrations',
      value: '1,900',
      status: 'active',
      metadata: { conversion: '15%', source: 'Social Media' }
    },
    {
      id: '3',
      title: 'Q3 User Growth',
      subtitle: 'New Registrations',
      value: '3,000',
      status: 'active',
      metadata: { conversion: '18%', source: 'Paid Ads' }
    }
  ],
  'users-bar': [
    {
      id: '1',
      title: 'Desktop Users',
      subtitle: 'Device Analytics',
      value: '4,200',
      status: 'active',
      metadata: { avgSession: '8.5 min', bounceRate: '25%' }
    },
    {
      id: '2',
      title: 'Mobile Users',
      subtitle: 'Device Analytics',
      value: '3,100',
      status: 'active',
      metadata: { avgSession: '5.2 min', bounceRate: '35%' }
    },
    {
      id: '3',
      title: 'Tablet Users',
      subtitle: 'Device Analytics',
      value: '1,247',
      status: 'pending',
      metadata: { avgSession: '6.8 min', bounceRate: '30%' }
    }
  ],
  'revenue-line': [
    {
      id: '1',
      title: 'Week 1 Revenue',
      subtitle: 'Weekly Breakdown',
      value: '$15,000',
      status: 'active',
      metadata: { transactions: 450, avgOrder: '$33.33' }
    },
    {
      id: '2',
      title: 'Week 2 Revenue',
      subtitle: 'Weekly Breakdown',
      value: '$18,000',
      status: 'active',
      metadata: { transactions: 520, avgOrder: '$34.62' }
    },
    {
      id: '3',
      title: 'Week 3 Revenue',
      subtitle: 'Weekly Breakdown',
      value: '$12,000',
      status: 'inactive',
      metadata: { transactions: 380, avgOrder: '$31.58' }
    },
    {
      id: '4',
      title: 'Week 4 Revenue',
      subtitle: 'Weekly Breakdown',
      value: '$22,000',
      status: 'active',
      metadata: { transactions: 610, avgOrder: '$36.07' }
    }
  ],
  'revenue-pie': [
    {
      id: '1',
      title: 'Subscription Revenue',
      subtitle: 'Revenue Source',
      value: '45%',
      status: 'active',
      metadata: { subscribers: 2500, churnRate: '5%' }
    },
    {
      id: '2',
      title: 'One-time Purchases',
      subtitle: 'Revenue Source',
      value: '30%',
      status: 'active',
      metadata: { orders: 850, repeatRate: '25%' }
    },
    {
      id: '3',
      title: 'Upgrades Revenue',
      subtitle: 'Revenue Source',
      value: '25%',
      status: 'active',
      metadata: { upgrades: 320, conversionRate: '15%' }
    }
  ],
  'orders-bar': [
    {
      id: '1',
      title: 'Monday Orders',
      subtitle: 'Daily Performance',
      value: '180',
      status: 'active',
      metadata: { peak: '2 PM', avgValue: '$45' }
    },
    {
      id: '2',
      title: 'Tuesday Orders',
      subtitle: 'Daily Performance',
      value: '220',
      status: 'active',
      metadata: { peak: '3 PM', avgValue: '$52' }
    },
    {
      id: '3',
      title: 'Wednesday Orders',
      subtitle: 'Daily Performance',
      value: '160',
      status: 'pending',
      metadata: { peak: '1 PM', avgValue: '$38' }
    },
    {
      id: '4',
      title: 'Thursday Orders',
      subtitle: 'Daily Performance',
      value: '240',
      status: 'active',
      metadata: { peak: '4 PM', avgValue: '$48' }
    },
    {
      id: '5',
      title: 'Friday Orders',
      subtitle: 'Daily Performance',
      value: '200',
      status: 'active',
      metadata: { peak: '5 PM', avgValue: '$55' }
    }
  ]
};