# Crypto Price Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, simulating WebSocket updates and managing all state via Redux.

![Demo GIF](https://via.placeholder.com/800x450.png?text=Demo+GIF+Here)

## Features

- Responsive cryptocurrency price table with real-time updates
- Simulated WebSocket connection for live data updates
- Complete Redux state management using Redux Toolkit
- Color-coded percentage changes
- Sparkline charts for 7-day price history
- Dark/light mode support

## Tech Stack

- **Frontend**: React, Next.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Custom canvas-based sparkline charts

## Architecture

The application follows a clean architecture pattern:

- **Components**: UI components that render the data
- **Redux Store**: Central state management
  - **Slices**: Feature-based state management (crypto slice)
  - **Selectors**: Memoized selectors for efficient data access
  - **Thunks**: Async actions for simulated WebSocket connection
- **Utils**: Helper functions for formatting and data manipulation

## Setup Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

- The application initializes with sample cryptocurrency data
- A simulated WebSocket connection is established on component mount
- Every 1.5 seconds, random updates are dispatched to the Redux store
- The UI automatically re-renders with the updated data
- All state changes are managed through Redux actions and reducers

## Bonus Features Implemented

- Dark/light mode toggle
- Responsive design for all screen sizes
- Optimized re-renders using memoized selectors
- Interactive tooltips for information

## Future Improvements

- Integrate real WebSocket connection (e.g., Binance API)
- Add sorting and filtering options
- Implement localStorage for persisting user preferences
- Add unit tests for reducers and selectors
- Implement TypeScript for better type safety (already partially implemented)

## License

MIT
