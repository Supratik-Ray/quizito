import Header from "../components/Header";
import Button from "../components/Button";
import { useGameContext } from "../contexts/gameContext";
import QuizOptions from "../components/QuizOptions";
import ProgressBar from "../components/ProgressBar";
function QuizScreen() {
  const { state, dispatch } = useGameContext();
  const { questions, index, playerAnswers } = state;
  const question = questions[index];
  const numQuestions = questions.length;
  const answered = playerAnswers.length === index + 1;
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
        <h2 className="text-white text-2xl">{question.text}</h2>
        <QuizOptions options={question.options} />
      </div>
      {answered && (
        <Button
          bgColor="bg-slate-800"
          style="text-white ml-auto block"
          onClick={handleNextQuestion}
        >
          {lastQuestion ? "Finish Quiz" : "Next Question"}
        </Button>
      )}
    </div>
  );
}

export default QuizScreen;
