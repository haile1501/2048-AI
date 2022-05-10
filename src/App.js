import GameBoard from "./components/game-board/game-board.component";
import { GameStateProvider } from "./context/game-state.context";
import TopBoard from "./components/top-board/top-board.component";

function App() {
  return (
    <div className="main-game">
      <GameStateProvider>
        <TopBoard />
        <GameBoard />
      </GameStateProvider>
    </div>
  );
}

export default App;
