export const initialState = {
  code: "",
  player1: "",
  player2: "",
  playerRole: "",
  phase: "start", // "start" | "answering" | "waiting" | "guessing" | "end",
  questions: [],
  index: 0,
  playerAnswers: [],
  partnerAnswers: [],
  guesses: [],
  scores: {
    player1: null,
    player2: null,
  },
  loading: false,
  error: null,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case "SET_GAME_CODE":
      return { ...state, code: action.payload };
    case "SET_PLAYER_NAMES":
      return {
        ...state,
        player1: action.payload.player1,
        player2: action.payload.player2,
      };
    case "SET_PLAYER_ROLE":
      return {
        ...state,
        playerRole: action.payload,
      };
    case "SET_PHASE":
      return { ...state, phase: action.payload };
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };
    case "NEXT_QUESTION": {
      const lastQuestion = state.index === state.questions.length - 1;
      return {
        ...state,
        index: lastQuestion ? 0 : state.index + 1,
        phase: lastQuestion
          ? state.phase === "guessing"
            ? "end"
            : "waiting"
          : state.phase,
      };
    }
    case "SET_ANSWERS":
      return {
        ...state,
        playerAnswers: [...state.playerAnswers, action.payload],
      };
    case "SET_PARTNER_ANSWERS":
      return { ...state, partnerAnswers: action.payload };
    case "SET_GUESSES":
      return { ...state, guesses: [...state.guesses, action.payload] };
    case "SET_SCORES":
      return { ...state, scores: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
