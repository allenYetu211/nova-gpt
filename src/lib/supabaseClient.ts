import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.SUPBASE_URL || '', process.env.ACCESS_TOKEN || '');
