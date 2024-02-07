import { createClient } from "@supabase/supabase-js"

export const supabase = createClient('https://coxnvuiywfimghtmlzqh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNveG52dWl5d2ZpbWdodG1senFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NTk1MDAsImV4cCI6MjAyMjEzNTUwMH0.BuOjaPIc0c92T-h2zQnd0iKenyrnxokiu1gPgUtYb_4');