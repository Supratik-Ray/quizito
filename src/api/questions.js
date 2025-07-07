import supabase from "./supabaseClient";

export async function getAllQuestions() {
  try {
    const { data, error } = await supabase.from("questions").select("*");
    if (error) throw new Error(error.message);
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
