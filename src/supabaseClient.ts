import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zinxsnxerkfbtkzwuwcd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbnhzbnhlcmtmYnRrend1d2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTkxNzcsImV4cCI6MjA1NzM3NTE3N30.Spue9DeKZGtWYkbkNuuV-wvHNdt9UdWx7Oz1r2d4Dds';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
