import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const missingConfigMessage =
  "Supabase configuration is missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.";

if (!isSupabaseConfigured) {
  console.warn(missingConfigMessage);
}

// Without config, any use of the client throws so only blog features fail, not the whole app.
const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, detectSessionInUrl: false },
    })
  : (new Proxy({} as SupabaseClient, {
      get() {
        throw new Error(missingConfigMessage);
      },
    }));

export default supabase;
