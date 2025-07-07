import { initialState, gameReducer } from "../reducers/gameReducer";
import { useReducer } from "react";
import { GameContext } from "./gameContext";

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
