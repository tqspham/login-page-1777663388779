import { createClient } from '@supabase/supabase-js';

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are not configured');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseInstance;
}

export const supabase = new Proxy({}, {
  get(target, prop) {
    return Reflect.get(getSupabase(), prop);
  },
}) as ReturnType<typeof createClient>;
