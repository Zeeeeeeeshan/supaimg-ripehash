import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vmlbitqublnhkivpxlwf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtbGJpdHF1YmxuaGtpdnB4bHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTU0MDYsImV4cCI6MjA3MzkzMTQwNn0.S5CEPVsECXXAN6bxjkr5FOGZYRDK3Vt66_uMq4h-8Zc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
