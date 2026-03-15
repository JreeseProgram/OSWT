import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
    import.meta.env.VITE_SUPABASE!,
    import.meta.env.VITE_KEY!,
);

export default supabaseClient;
