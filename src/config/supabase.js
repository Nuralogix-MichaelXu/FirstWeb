export const SUPABASE_URL = 'https://mdcnwgfklomyibgeemut.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kY253Z2ZrbG9teWliZ2VlbXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMjI2NTIsImV4cCI6MjA5MDY5ODY1Mn0.yQ6swHvXf38ZASLy7YnO-CaJO_pVj5zk2N5e0grDC0s';

export function getSupabaseClient() {
  if (!window.supabase?.createClient) {
    throw new Error('Supabase SDK not found. Ensure the supabase-js CDN script is loaded.');
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

