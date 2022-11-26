import { json, LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = async ({ context, request }) => {
  // const session = await context.sessionStorage.get("userId"))
  console.log('XX',   context )

   await context.sessionStorage.put("b",'bbbb')
 // console.log('put',put)
  const t = await context.sessionStorage.get("b")
  console.log('a', t)
  return {data:t}

  // const session = await context.sessionStorage.getSession(
  //   request.headers.get("Cookie")
  // )

  // let headers = {}

  // if (!session.has("userId")) {
  //   session.set("userId", `user:${Math.random()}`)
  //   headers["Set-Cookie"] = await context.sessionStorage.commitSession(session)
  // } else {
  //   console.log(session.get("userId"))
  // }
  // return json(null, { headers })
}

export default function Index() {
  const {data} =useLoaderData()
  console.log(data)
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Hola</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
