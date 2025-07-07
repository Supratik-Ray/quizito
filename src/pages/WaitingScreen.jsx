import { useEffect, useCallback } from "react";
import { useGameContext } from "../contexts/gameContext";
import { submitAnswers } from "../api/games";
import useGameListener from "../hooks/useGameListener";
import Button from "../components/Button";
import Header from "../components/Header";

function WaitingScreen() {
  const { state, dispatch } = useGameContext();
  const { code, playerAnswers, playerRole, partnerAnswers, player1, player2 } =
    state;

  function handleStartGuessing() {
    dispatch({ type: "SET_PHASE", payload: "guessing" });
  }

  const setPartnerAnswers = useCallback(
    (game) => {
      if (game[playerRole === "player1" ? "player2_done" : "player1_done"]) {
        dispatch({
          type: "SET_PARTNER_ANSWERS",
          payload:
            game[
              playerRole === "player1" ? "player2_answers" : "player1_answers"
            ],
        });
      }
    },
    [dispatch, playerRole]
  );

  useEffect(() => {
    async function finishQuiz() {
      try {
        dispatch({ type: "SET_ERROR", payload: null });
        const { game, error } = await submitAnswers(
          code,
          playerAnswers,
          playerRole
        );
        if (error) throw new Error(error);
        setPartnerAnswers(game);
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
        console.error(err.message);
      }
    }

    finishQuiz();
  }, [setPartnerAnswers, code, dispatch, playerAnswers, playerRole]);

  useGameListener((game) => {
    setPartnerAnswers(game);
  });

  return (
    <div className="flex flex-col gap-16  p-8 justify-center items-center">
      <Header />
      {partnerAnswers.length > 0 ? (
        <Button
          bgColor="bg-white"
          style="hover:text-white"
          onClick={handleStartGuessing}
        >
          Start Guessing
        </Button>
      ) : (
        <p className="text-white text-lg">
          Waiting for {playerRole === "player1" ? player2 : player1} to
          finish....
        </p>
      )}
    </div>
  );
}

export default WaitingScreen;
