import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/tokens.css';
import './styles/components.css';
import './styles/shell.css';

const rootEl = document.getElementById('root');
const bootError = document.getElementById('boot-error');

function showError(error: unknown) {
  const message = error instanceof Error ? error.stack || error.message : String(error);
  if (bootError) {
    bootError.style.display = 'block';
    bootError.textContent = 'App failed to start:\n' + message;
  }
  console.error(error);
}

if (!rootEl) {
  showError(new Error('Missing #root element'));
} else {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    showError(error);
  }
}
