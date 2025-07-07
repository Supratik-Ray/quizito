import { useEffect, useCallback } from "react";
import { useGameContext } from "../contexts/gameContext";
import { submitGuessScore } from "../api/games";
import useGameListener from "../hooks/useGameListener";
import Button from "../components/Button";
import Header from "../components/Header";

function ResultScreen() {
  const { state, dispatch } = useGameContext();
  const {
    code,
    playerRole,
    scores,
    player1,
    player2,
    guesses,
    partnerAnswers,
  } = state;

  let winner = null;
  let loser = null;
  if (scores.player1 !== undefined && scores.player2 !== undefined) {
    if (scores.player1 > scores.player2) {
      winner = player1;
      loser = player2;
    } else if (scores.player2 > scores.player1) {
      winner = player2;
      loser = player1;
    } else {
      winner = "No one";
      loser = "the other";
    }
  }

  const setPartnerAnswers = useCallback(
    (game) => {
      if (
        game[playerRole === "player1" ? "player2_guessed" : "player1_guessed"]
      ) {
        dispatch({
          type: "SET_SCORES",
          payload: {
            player1: game.player1_correct_guesses,
            player2: game.player2_correct_guesses,
          },
        });
      }
    },
    [dispatch, playerRole]
  );

  useEffect(() => {
    async function finishGuessing() {
      try {
        dispatch({ type: "SET_ERROR", payload: null });
        const totalScore = guesses.reduce(
          (acc, guess, i) => (guess === partnerAnswers[i] ? acc + 1 : acc),
          0
        );
        const { game, error } = await submitGuessScore(
          code,
          totalScore,
          playerRole
        );
        if (error) throw new Error(error);
        setPartnerAnswers(game);
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
        console.error(err.message);
      }
    }

    finishGuessing();
  }, [
    setPartnerAnswers,
    code,
    dispatch,
    playerRole,
    scores,
    guesses,
    partnerAnswers,
  ]);

  useGameListener((game) => {
    setPartnerAnswers(game);
  });

  return (
    <div className="flex flex-col gap-16  p-8 justify-center items-center text-center">
      <Header />
      {scores.player1 !== null && scores.player2 !== null ? (
        <>
          <h3 className="text-2xl text-green-400">
            {winner} won the game🎉! {winner} knows about {loser} more😉.
          </h3>
          <p className="text-lg text-white">
            {player1} guessed {scores.player1}/{guesses.length} answers
            correctly and {player2} guessed {scores.player2}/{guesses.length}{" "}
            answers correctly
          </p>
        </>
      ) : (
        <p className="text-white text-lg">
          Waiting for {playerRole === "player1" ? player2 : player1} to finish
          guessing....
        </p>
      )}
    </div>
  );
}

export default ResultScreen;
