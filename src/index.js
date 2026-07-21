import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Fade out the pre-mount skeleton once the app has painted.
requestAnimationFrame(() => {
  const sk = document.getElementById('app-skeleton');
  if (sk) {
    sk.classList.add('sk-hide');
    setTimeout(() => sk.remove(), 500);
  }
});