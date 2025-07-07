import Header from "../components/Header";
import Button from "../components/Button";
import { useGameContext } from "../contexts/gameContext";
import GuessOptions from "../components/GuessOptions";
import ProgressBar from "../components/ProgressBar";
import personalizeQuestion from "../utility/personalized";
function GuessScreen() {
  const { state, dispatch } = useGameContext();
  const { questions, index, guesses, playerRole, player1, player2 } = state;
  const question = questions[index];
  const numQuestions = questions.length;
  const answered = guesses.length === index + 1;
  const lastQuestion = index === numQuestions - 1;

  function handleNextQuestion() {
    dispatch({ type: "NEXT_QUESTION" });
  }

  return (
    <div className="lg:w-3/4 mx-auto">
      <Header />
      <ProgressBar
        index={index}
        numQuestions={numQuestions}
        answered={answered}
      />
      <div className="bg-slate-600 rounded-sm  mb-6 p-8">
        <p className="mb-4 text-lg text-white">
          Question {index + 1}/{numQuestions}
        </p>
        <h2 className="text-white text-2xl">
          {personalizeQuestion(
            question.text,
            playerRole === "player1" ? player2 : player1
          )}
        </h2>
        <GuessOptions options={question.options} />
      </div>
      {answered && (
        <Button
          bgColor="bg-slate-800"
          style="text-white ml-auto block"
          onClick={handleNextQuestion}
        >
          {lastQuestion ? "Finish Guess" : "Next Question"}
        </Button>
      )}
    </div>
  );
}

export default GuessScreen;
