import { createClient } from '@supabase/supabase-js'

export default function (SUPABASE_URL, SUPABASE_ANON_KEY) {
  createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
