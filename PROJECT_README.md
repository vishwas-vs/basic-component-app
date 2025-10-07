# Basic Component App - Drill-Down Dashboard

A Next.js application showcasing Bit components with a drill-down interface from stat cards to graphs to detailed list views.

## Features

- **Dashboard Level**: Overview with interactive stat cards showing key metrics
- **Graph Level**: Various chart types (line, bar, pie, area) for detailed analytics
- **Detail Level**: Comprehensive list views with metadata and status information
- **Navigation**: Breadcrumb navigation to easily move between levels

## Bit Components Used

- `@shrijulvenkatesh/ds-pesu.stat-card` - For displaying key performance indicators
- `@shrijulvenkatesh/ds-pesu.graph` - For chart visualizations  
- `@shrijulvenkatesh/ds-pesu.list-view` - For detailed data lists

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── StatsGrid.tsx        # Grid of stat cards
│   ├── GraphGrid.tsx        # Grid of graph components
│   ├── DetailsList.tsx      # Detailed list view
│   └── Navigation.tsx       # Breadcrumb navigation
├── data/
│   └── sampleData.ts        # Sample data for all components
└── types/
    └── navigation.ts        # TypeScript interfaces
```

## How It Works

1. **Dashboard View**: Displays 4 main KPI cards (Sales, Users, Revenue, Orders)
2. **Graph View**: Clicking on any stat card shows relevant charts with different visualizations
3. **Detail View**: Clicking on any graph shows a detailed list of the underlying data

## Sample Data

The application includes comprehensive sample data with:
- 4 main dashboard statistics
- Multiple chart types for each statistic
- Detailed breakdown data for each chart
- Realistic metadata and status information

## Components Variations

### Stat Cards
- Different icons and colors
- Trend indicators (up/down/neutral)
- Hover effects and transitions

### Graphs  
- **Line Charts**: For trending data
- **Bar Charts**: For categorical comparisons
- **Pie Charts**: For percentage breakdowns
- **Area Charts**: For cumulative data

### List Views
- Status indicators (active/inactive/pending)
- Metadata display
- Value formatting
- Hover states

## Built With

- **Next.js 15.5.4** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Bit Components** - UI components from ds-pesu design system

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint