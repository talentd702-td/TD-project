import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://llzardxjsqypkkslhrbr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsemFyZHhqc3F5cGtrc2xocmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NjI4MjcsImV4cCI6MjA0NzUzODgyN30.HjLHbeDu9IbriOH2-7vW0b-WblpVQjWjABcudG-93KU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);