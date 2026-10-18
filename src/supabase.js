import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bumoiebziefburtmisnn.supabase.co';

const supabasePublishableKey = 'sb_publishable_2jHWucsQvNqEiLLk9Re3aA_n0JFVr42';

export const supabase = createClient(
supabaseUrl,
supabasePublishableKey
);
