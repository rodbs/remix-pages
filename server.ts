import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
// import { createClient } from '@supabase/supabase-js'
// import { List } from './do'

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => context.env,
})

// export function onRequest(context) {
//   return handleRequest(context)
// }

const handler = {
  async fetch(request, env, ctx) {
    return handleRequest({
      request: new Request(request),
      env,
      waitUntil: ctx.waitUntil,
      params: {},
      data: undefined,
      next: () => {
        throw new Error('next() called in Worker')
      },
    })
  },
}

export default handler

export { Counter } from './do'
