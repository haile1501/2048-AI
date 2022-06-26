import GameBoard from "./components/game-board/game-board.component";
import TopBoard from "./components/top-board/top-board.component";
import SideBar from "./components/side-bar/side-bar.component";
import StatsBoard from "./components/stats-board/stats-board.component";

function App() {
  return (
    <div className="main-game">
      <TopBoard />
      <GameBoard />
      <SideBar />
      <StatsBoard />
    </div>
  );
}

export default App;
