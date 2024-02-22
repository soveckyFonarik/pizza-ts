import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElemetn: HTMLElement | null = document.getElementById('root');
if (rootElemetn !== null) {
  const root = ReactDOM.createRoot(rootElemetn);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
