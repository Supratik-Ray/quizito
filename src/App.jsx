import { useGameContext } from "./contexts/gameContext";
import StartScreen from "./pages/StartScreen";
import QuizScreen from "./pages/QuizScreen";
import WaitingScreen from "./pages/WaitingScreen";
import ResultScreen from "./pages/ResultScreen";
import GuessScreen from "./pages/GuessScreen";

function App() {
  const { state } = useGameContext();
  const { phase, questions, index } = state;

  return (
    <div className="p-5 bg-slate-700 min-h-screen font-mono">
      {phase === "start" && <StartScreen />}
      {phase === "answering" && <QuizScreen question={questions[index]} />}
      {phase === "waiting" && <WaitingScreen />}
      {phase === "guessing" && <GuessScreen />}
      {phase === "end" && <ResultScreen />}
    </div>
  );
}

export default App;
