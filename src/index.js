import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GameStateProvider } from "./context/game-state.context";
import { AiProvider } from './context/ai.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameStateProvider>
      <AiProvider>
        <App />
      </AiProvider>
    </GameStateProvider>
  </React.StrictMode>
);
