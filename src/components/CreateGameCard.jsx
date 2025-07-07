import { useGameContext } from "../contexts/gameContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { useState } from "react";
import { createGame } from "../api/games";
import useGameListener from "../hooks/useGameListener";

function CreateGameCard() {
  const { state, dispatch } = useGameContext();
  const { code, player1 } = state;
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useGameListener((game) => {
    dispatch({
      type: "SET_PLAYER_NAMES",
      payload: { player1: game.player1_name, player2: game.player2_name },
    });
  });

  async function handleCreateGame() {
    try {
      dispatch({ type: "SET_ERROR", payload: null });
      setIsLoading(true);
      const { code, error } = await createGame(name);
      if (error) throw new Error(error);
      dispatch({ type: "SET_GAME_CODE", payload: code });
      dispatch({ type: "SET_PLAYER_ROLE", payload: "player1" });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <h3 className="text-2xl">Create New Game</h3>

      {code ? (
        <p className="text-lg text-green-300">
          Hey {player1}! please share this code with your partner
        </p>
      ) : (
        <>
          <label htmlFor="">Enter your Name:</label>
          <input
            type="text"
            className="bg-white outline-none block p-2 rounded-sm w-3/4 text-black"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </>
      )}
      {code && (
        <p>
          Your Code is:{" "}
          <span className="text-red-300 text-lg font-bold">{code}</span>
        </p>
      )}

      <Button disabled={!name || isLoading || code} onClick={handleCreateGame}>
        {isLoading ? "Creating..." : "Create Game"}
      </Button>
    </Card>
  );
}

export default CreateGameCard;
