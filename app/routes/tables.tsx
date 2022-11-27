import { json, LoaderFunction, ActionFunction } from '@remix-run/cloudflare'
import { Form, useLoaderData, useActionData } from '@remix-run/react'
import supabase from '~/lib/supabase'
import { readFrom, writeTo, listFrom } from '~/lib/cache'
import { createClient } from '@supabase/supabase-js'

export const loader: LoaderFunction = async ({ context, request }) => {
  // const session = await context.sessionStorage.get("userId"))
  console.log('CONTEXT', context)
  // const aa = await writeTo(context.TABLES, 'tables/aa', { id: 'aa' })
  // console.log('aa', aa)
  // const aa = await readFrom(context.TABLES, '/tables/gram2-tbl1')
  // console.log('aAA', aa)
  let res

  const { keys } = await context.TABLES.list() // (await listFrom(context.TABLES)) || {}
  console.log('keys', keys)

  const cachedTables = await readFrom(context.TABLES, '/tables/%')
  if (cachedTables) {
    console.log('CACHE')
    res = cachedTables
  } else {
    console.log('SUPABSE')
    const supabase = createClient(context.SUPABASE_URL, context.SUPABASE_ANON_KEY)
    const { data } = await supabase.from('table').select('*')
    res = data
    //const resWriteKV = await writeTo(context.TABLES, '/tables', data)
    const resProm = await Promise.all(
      data?.map(async (el) => await writeTo(context.TABLES, `/tables/${el.id}`, el))
    )
  }
  // const { data } = await supabase.from('table').select('*')
  // const res = await writeTo(context.TABLES, '/tables', data)

  // cont wr = await context.TABLES.set()
  //  console.log(data)
  // await context.sessionStorage.put('b', 'bbbb')
  // // console.log('put',put)
  // const t = await context.sessionStorage.get('b')
  // console.log('a', t)
  return { tables: res }
}

export const action: ActionFunction = async ({ request, context }) => {
  // console.log('request', request)
  let formData = await request.formData()
  console.log('formData Entries root', Object.fromEntries(formData))
  let { _action, id, name, ...values } = Object.fromEntries(formData)
  await writeTo(context.TABLES, `/tables/${id}`, { id, name })
  //

  //
  // const { type, record, old_record } = JSON.parse(request.body)
  // // const supabase = createClient(context.SUPABASE_URL, context.SUPABASE_ANON_KEY)

  // if (type === 'INSERT' || type === 'UPDATE') {
  //   await writeTo(context.TABLES, `/tables/${record.id}`, record)
  // }

  // if (type === 'DELETE') {
  //   await context.TABLES.delete(`/tables/${old_record.id}`)
  // }

  // const { data: articles } = await supabase.from("articles").select("*");
  // await writeTo(ARTICLES, "/articles", articles);
  // console.log("updated cache");

  return null
}

export default function Index() {
  const { tables } = useLoaderData()
  // console.log(tables)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Tables</h1>

      <Form method="post">
        <input type="text" name="id" />
        <input type="text" name="value" />
        <button type="submit">Create</button>
      </Form>
      <div>
        <ul>
          {tables.map((el) => (
            <li key={el.id}>{el.id}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
