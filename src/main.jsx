import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element');
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    console.error('Error rendering the application:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: white; background: #ef4444; border-radius: 8px; margin: 20px; font-family: sans-serif;">
        <h1 style="font-size: 20px; margin-bottom: 10px;">Application Error</h1>
        <p>Something went wrong while starting the app.</p>
        <pre style="margin-top: 10px; font-size: 12px; opacity: 0.8; overflow: auto;">${error.message}</pre>
      </div>
    `;
  }
}
