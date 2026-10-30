import { createClient } from '@supabase/supabase-js';

// Audit branch can target the isolated test project through Vite environment variables.
// Existing values remain as fallback for the current deployment configuration.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://ivdbxxbtsojauhijlgvs.supabase.co';

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_xCB7_E05CCXdC3UFhWn9wQ_vhmhdZkB';

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
