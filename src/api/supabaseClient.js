import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vbgjdeusyoppepfzuxet.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZ2pkZXVzeW9wcGVwZnp1eGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTE0OTIsImV4cCI6MjA2NzM2NzQ5Mn0.qjWHjOZblztsq3KSwWHiqG_uqAFl6DtHdkJMNkBzf2w";

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
