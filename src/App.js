import GameBoard from "./components/game-board/game-board.component";
import ScoreBoard from "./components/score-board/score-board.component";

function App() {
  return (
    <div className="main-game">
      <ScoreBoard />
      <GameBoard />
    </div>
  );
}

export default App;
