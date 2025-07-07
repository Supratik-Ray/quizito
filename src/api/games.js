import supabase from "./supabaseClient.js";
import randomCodeGenerator from "../utility/randomCode.js";

//--- FUNCTIONS I MADE ---

//checkIfGameExists
//getGameDetails
//createGame
//joinGame
//submitAnswer
//submitGuessScore

export async function checkIfGameExists(code) {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("code", code);

    if (error) throw new Error(error.message);
    return { exists: data.length > 0, error: null };
  } catch (err) {
    return { exists: false, error: err.message };
  }
}

export async function getGameDetails(code) {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("code", code);

    if (error) throw new Error(error.message);
    return { game: data[0], error: null };
  } catch (err) {
    return { game: null, error: err.message };
  }
}

export async function createGame(player1Name) {
  try {
    const randomCode = randomCodeGenerator();
    const { error } = await supabase
      .from("games")
      .insert({ code: randomCode, player1_name: player1Name });

    if (error) throw new Error(error.message);

    return { code: randomCode, error: null };
  } catch (err) {
    return { code: null, error: err.message };
  }
}

export async function joinGame(player2Name, code) {
  try {
    const { error } = await supabase
      .from("games")
      .update({ player2_name: player2Name })
      .eq("code", code);

    if (error) throw new Error(error.message);

    return { error: null };
  } catch (err) {
    return { error: err.message };
  }
}

export async function submitAnswers(code, answers, player) {
  try {
    const fieldToUpdate =
      player === "player1" ? "player1_answers" : "player2_answers";
    const doneField = player === "player1" ? "player1_done" : "player2_done";

    const { data, error } = await supabase
      .from("games")
      .update({
        [fieldToUpdate]: answers,
        [doneField]: true,
      })
      .eq("code", code)
      .select();

    if (error) throw new Error(error.message);

    return { game: data[0], error: null };
  } catch (err) {
    return { game: null, error: err.message };
  }
}

export async function submitGuessScore(code, score, player) {
  try {
    const fieldToUpdate =
      player === "player1"
        ? "player1_correct_guesses"
        : "player2_correct_guesses";
    const doneField =
      player === "player1" ? "player1_guessed" : "player2_guessed";

    const { data, error } = await supabase
      .from("games")
      .update({
        [fieldToUpdate]: score,
        [doneField]: true,
      })
      .eq("code", code)
      .select();

    if (error) throw new Error(error.message);

    return { game: data[0], error: null };
  } catch (err) {
    return { game: null, error: err.message };
  }
}
