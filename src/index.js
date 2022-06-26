import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GameStateProvider } from "./context/game-state.context";
import { AiProvider } from './context/ai.context';
import { RecordProvider } from './context/record.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameStateProvider>
      <AiProvider>
        <RecordProvider>
          <App />
        </RecordProvider>
      </AiProvider>
    </GameStateProvider>
  </React.StrictMode>
);
