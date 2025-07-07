import { useState } from "react";
import { useGameContext } from "../contexts/gameContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { checkIfGameExists, joinGame, getGameDetails } from "../api/games";

function JoinGameCard() {
  const { state, dispatch } = useGameContext();
  const { player2 } = state;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleJoinGame() {
    try {
      dispatch({ type: "SET_ERROR", payload: null });
      setIsLoading(true);

      const { exists } = await checkIfGameExists(code);
      if (!exists) throw new Error(`game not found!`);
      const { error } = await joinGame(name, code);
      if (error) throw new Error(error);
      const { game, error: err } = await getGameDetails(code);
      if (err) throw new Error(`some error occured! ${err.message}`);
      dispatch({ type: "SET_GAME_CODE", payload: game.code });
      dispatch({ type: "SET_PLAYER_ROLE", payload: "player2" });
      dispatch({
        type: "SET_PLAYER_NAMES",
        payload: { player1: game.player1_name, player2: game.player2_name },
      });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <h3 className="text-2xl">Join Existing Game</h3>
      {state.code ? (
        <>
          <p className="text-lg text-green-300">
            Hey {player2}! you joined a room
          </p>
          <p>
            Your Code is:
            <span className="text-red-300 text-lg font-bold">{state.code}</span>
          </p>
        </>
      ) : (
        <>
          <label htmlFor="">Enter your Name:</label>
          <input
            type="text"
            className="bg-white outline-none block p-2 rounded-sm w-3/4 text-black"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label htmlFor="">Enter your Code:</label>
          <input
            type="text"
            className="bg-white outline-none block p-2 rounded-sm w-3/4 text-black"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
        </>
      )}
      <Button onClick={handleJoinGame} disabled={!name || !code || isLoading}>
        {isLoading ? "Joining the game..." : "Join Game"}
      </Button>
    </Card>
  );
}

export default JoinGameCard;
