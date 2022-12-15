import { json } from '@remix-run/cloudflare'
import type { LoaderFunction, DataFunctionArgs, ActionFunction } from '@remix-run/cloudflare'
import { Form, useActionData, useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = async ({ request, context }: DataFunctionArgs) => {
  const url = new URL(request.url)

  console.log('context', context)

  const counter = context.COUNTER as DurableObjectNamespace
  const id = counter.idFromName('A')
  const obj = counter.get(id)
  const resp = await obj.fetch(`${url.origin}/current`)
  const count = await resp.text()

  return json(count)
}

export const action: ActionFunction = async ({ request, context }: DataFunctionArgs) => {
  const url = new URL(request.url)

  const counter = context.COUNTER as DurableObjectNamespace
  const id = counter.idFromName('A')
  const obj = counter.get(id)
  const resp = await obj.fetch(`${url.origin}/increment`)
  const count = await resp.text()

  return count
}

export default function Durable() {
  const count = useLoaderData()
  const actionData = useActionData()

  return (
    <div>
      <h1>Welcome to Remix on cloudflare workers!</h1>
      <div>count: {count}</div>
      {actionData && <div>action result: {actionData}</div>}

      <Form method="post">
        <button type="submit">increment</button>
      </Form>
    </div>
  )
}
