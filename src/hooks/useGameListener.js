import { useContext, useEffect } from "react";
import { GameContext } from "../contexts/gameContext";
import supabase from "../api/supabaseClient";

export default function useGameListener(onUpdate) {
  const { state } = useContext(GameContext);
  useEffect(() => {
    if (!state.code) return;

    const subscription = supabase
      .channel(`game-${state.code}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "games",
          filter: `code=eq.${state.code}`,
        },
        (payload) => {
          const updatedGame = payload.new;
          console.log("📡 Game updated:", updatedGame);
          onUpdate(updatedGame);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, [state.code, onUpdate]);
}
