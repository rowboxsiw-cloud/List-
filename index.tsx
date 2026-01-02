import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as Sentry from "@sentry/react";

// Initialize Sentry
// Note: In a real production build, use process.env.VITE_SENTRY_DSN
Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN || "", // Fail-safe if env not provided
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, 
  // Session Replay
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0,
  enabled: process.env.NODE_ENV === 'production' && !!process.env.VITE_SENTRY_DSN
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);