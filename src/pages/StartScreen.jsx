import Header from "../components/Header";
import { useGameContext } from "../contexts/gameContext";

import CreateGameCard from "../components/CreateGameCard";
import JoinGameCard from "../components/JoinGameCard";
import Button from "../components/Button";
import { getAllQuestions } from "../api/questions";
import { useState } from "react";

function StartScreen() {
  const { state, dispatch } = useGameContext();
  const { player1, player2, code, playerRole } = state;
  const [isLoading, setIsLoading] = useState(false);

  async function handleStartQuiz() {
    try {
      dispatch({ type: "SET_ERROR", payload: null });
      setIsLoading(true);
      const { data: questions, error } = await getAllQuestions();
      console.log(questions);
      if (error) throw new Error(error.message);
      dispatch({ type: "SET_QUESTIONS", payload: questions });
      dispatch({ type: "SET_PHASE", payload: "answering" });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="md:flex md:gap-7 my-10 lg:my-20 md:w-3/4 mx-auto md:justify-center space-y-6 md:space-y-0">
        {!playerRole && (
          <>
            <CreateGameCard />
            <JoinGameCard />
          </>
        )}
        {playerRole === "player1" && <CreateGameCard />}
        {playerRole === "player2" && <JoinGameCard />}
      </div>
      {code && (
        <div className="flex justify-center items-center flex-col space-y-6">
          {player1 && player2 ? (
            <>
              {playerRole === "player1" ? (
                <p className="text-green-300 text-center">
                  {player2} joined the game!
                </p>
              ) : (
                <p className="text-green-300 text-center">
                  Successfully joined {player1}'s game
                </p>
              )}
              <Button style={`lg:w-100 text-white`} onClick={handleStartQuiz}>
                {isLoading ? "Starting Quiz..." : "Start Quiz"}
              </Button>
            </>
          ) : (
            <p className="text-white text-lg">Waiting for player 2...</p>
          )}
        </div>
      )}
    </>
  );
}

export default StartScreen;
