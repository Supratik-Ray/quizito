import { useContext, createContext } from "react";

export const GameContext = createContext();

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGameContext must be used within a GameProvider");

  return context;
}
