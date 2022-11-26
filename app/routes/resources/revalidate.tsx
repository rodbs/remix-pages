import type { ActionFunction } from '@remix-run/cloudflare' // or cloudflare/deno
import { json } from '@remix-run/cloudflare' // or cloudflare/deno
import { writeTo } from '~/lib/cache'

export const action: ActionFunction = async ({ request, context }) => {
  // const { type, record, old_record } = JSON.parse(request.body)
  // // const supabase = createClient(context.SUPABASE_URL, context.SUPABASE_ANON_KEY)
  console.log('request payload ', request?.payload)
  console.log('request bosy', request?.body)
  switch (request.method) {
    case 'POST': {
      /* handle "POST" */
      const payload = await request.json()
      //console.log('payload', payload)
      const { type, record, old_record } = payload

      if (type === 'INSERT' || type === 'UPDATE') {
        await writeTo(context.TABLES, `/tables/${record.id}`, record)
      }

      if (type === 'DELETE') {
        await context.TABLES.delete(`/tables/${old_record.id}`)
      }
    }
    case 'PUT': {
      /* handle "PUT" */
    }
    case 'PATCH': {
      /* handle "PATCH" */
    }
    case 'DELETE': {
      /* handle "DELETE" */
    }
  }

  return json({ success: true }, 200)
}
