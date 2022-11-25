// import { createFetchHandler } from "../cloudflare-workers-esm";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import {  createCloudflareKVSessionStorage } from "@remix-run/cloudflare"

// @ts-ignore
 import * as build from "../build";

 

// const handleRequest = createPagesFunctionHandler({
//     build ,
//     getLoadContext: (context) => {
//       const sessionStorage = createCloudflareKVSessionStorage({
//         cookie: {
//           name: "SESSION_ID",
//           secrets: ["YOUR_COOKIE_SECRET"],
//           secure: true,
//           sameSite: "strict",
//         },
//         kv: context?.env?.sessionStorage,
//       })
  
//       return { sessionStorage }
//     },
//   })||{}

//   export function onRequest(context) {
//     return handleRequest(context)
//   }

  const handleRequest = createPagesFunctionHandler({
    build
  });
  
  export function onRequest(context) {
    return handleRequest(context);
  }


// export async function onRequest(context: any) {
//   let request = new Request(context.request);
//   request.headers.delete("If-None-Match");

//   return handleFetch(request, context.env, context);
// }

// let handler: ExportedHandler = {
//   fetch(request, env, context) {
//     request = new Request(request);
//     request.headers.delete("If-None-Match");

//     return handleFetch(request, env, context);
//   },
// };

// export default handler;