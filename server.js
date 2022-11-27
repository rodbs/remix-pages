import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
// import { createClient } from '@supabase/supabase-js'
// import { List } from './do'

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
})

export function onRequest(context) {
  return handleRequest(context)
}

export { List } from './do'
