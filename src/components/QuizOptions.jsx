import { useGameContext } from "../contexts/gameContext";

function QuizOptions({ options }) {
  const { dispatch, state } = useGameContext();
  const { playerAnswers, index } = state;
  const answered = playerAnswers[index] !== undefined;
  function handleAnswer(answer) {
    dispatch({ type: "SET_ANSWERS", payload: answer });
  }
  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-6 lg:gap-x-14 mt-6">
      {options.map((option, i) => (
        <button
          onClick={() => handleAnswer(i)}
          className={`${
            answered
              ? playerAnswers[index] === i
                ? "bg-slate-800 text-white"
                : "bg-white text-slate-800"
              : "bg-white text-slate-800  hover:bg-slate-800 hover:text-white hover:cursor-pointer"
          }  rounded-sm p-4 text-center text-lg font-bold`}
          key={option}
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuizOptions;
