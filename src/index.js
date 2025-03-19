import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles
import App from './App'; // Import the main App component
import { Provider } from 'react-redux'; // Import Provider from react-redux to connect Redux to React
import store from './redux/store'; // Import the Redux store

// Create the root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application wrapped in Redux Provider for state management
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Provide the Redux store to the entire application */}
      <App /> {/* Render the main App component */}
    </Provider>
  </React.StrictMode>,
);
