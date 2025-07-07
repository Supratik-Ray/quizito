import { useGameContext } from "../contexts/gameContext";

function GuessOptions({ options }) {
  const { dispatch, state } = useGameContext();
  const { partnerAnswers, index, guesses } = state;
  const answered = guesses[index] !== undefined;
  function handleGuess(guess) {
    dispatch({ type: "SET_GUESSES", payload: guess });
  }
  return (
    <div className="grid grid-cols-2 gap-y-6 gap-x-6 lg:gap-x-14 mt-6">
      {options.map((option, i) => (
        <button
          onClick={() => handleGuess(i)}
          className={`${
            answered
              ? i === partnerAnswers[index]
                ? "bg-green-400 text-white"
                : "bg-red-400 text-white"
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

export default GuessOptions;
