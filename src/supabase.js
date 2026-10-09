import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivdbxxbtsojauhijlgvs.supabase.co';

const supabasePublishableKey = 'sb_publishable_xCB7_E05CCXdC3UFhWn9wQ_vhmhdZkB';

export const supabase = createClient(
supabaseUrl,
supabasePublishableKey
);
