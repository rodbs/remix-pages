export function onRequest(context) { 
    console.log('hello',context)
    return new Response("Hello, world!")
}
