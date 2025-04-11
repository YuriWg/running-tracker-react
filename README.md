# Running Tracker React

This project is a React application for tracking running activities, visualizing data, and providing insights into running statistics. It is designed to be responsive and user-friendly, utilizing D3.js for data visualization.

## Project Structure

The project is organized as follows:

```
running-tracker-react
├── public
│   ├── index.html          # Main HTML file for the application
│   ├── favicon.ico         # Application icon
│   ├── manifest.json       # Web app manifest file
│   └── assets
│       └── lib
│           └── d3.v7.min.js # Local version of D3.js library
├── src
│   ├── App.js              # Main application component
│   ├── App.css             # Main styles for the application
│   ├── index.js            # Entry point for the React application
│   ├── index.css           # Global styles
│   ├── components          # Reusable components
│   │   ├── Title.js
│   │   ├── Quote.js
│   │   ├── Calendar.js
│   │   ├── RunningIcon.js
│   │   ├── StatsPanel.js
│   │   ├── TooltipManager.js
│   │   └── ExportButton.js
│   ├── utils               # Utility functions
│   │   ├── dataProcessor.js
│   │   ├── dateUtils.js
│   │   ├── formatters.js
│   │   ├── d3Loader.js
│   │   ├── textUtils.js
│   │   └── responsiveUtils.js
│   ├── data                # Data files
│   │   ├── runningData.js
│   │   ├── sampleData.js
│   │   └── quotes.js
│   ├── hooks               # Custom hooks
│   │   ├── useRunningData.js
│   │   ├── useResizeObserver.js
│   │   └── useD3.js
│   ├── context             # Context for global state management
│   │   └── AppContext.js
│   └── styles              # Component-specific styles
│       ├── variables.css
│       ├── Calendar.css
│       ├── StatsPanel.css
│       └── Tooltip.css
├── .github
│   └── workflows
│       └── deploy.yml      # GitHub Actions workflow for deployment
├── .gitignore              # Files and folders to ignore in Git
├── package.json            # npm configuration file
├── README.md               # Project documentation
├── LICENSE                 # Project license
└── .env                    # Environment variables
```

## Migration Guide

1. Migrate D3.js related code to `src/utils/d3Loader.js` and ensure it is called in the necessary components.
2. Move data processing logic to `src/utils/dataProcessor.js` and call it in the required components.
3. Transfer drawing logic to the respective components like `Calendar.js`, `StatsPanel.js`, etc.
4. Move state management logic to `src/hooks/useRunningData.js` and use this hook in `App.js`.
5. Ensure all component styles match the original project's styles.

## Deployment to GitHub Pages

1. Add a `homepage` field in `package.json` to set the GitHub Pages URL, e.g., `"homepage": "https://<username>.github.io/running-tracker-react"`.
2. Add deployment scripts in `package.json`:
   ```json
   "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
   }
   ```
3. Install the `gh-pages` package:
   ```
   npm install gh-pages --save-dev
   ```
4. Run the deployment command:
   ```
   npm run deploy
   ```
5. Ensure GitHub repository settings enable GitHub Pages, selecting the `gh-pages` branch as the source. 

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/<username>/running-tracker-react.git
cd running-tracker-react
npm install
```

Then, start the development server:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to view the application.