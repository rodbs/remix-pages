export class List {
  constructor(public state: any, public env: any) {}

  async fetch(request: Request) {
    const url = new URL(request.url)

    let value: number = (await this.state.storage.get('value')) || 0

    switch (url.pathname) {
      case '/current':
        break
      case '/increment':
        ++value
        break
      case '/decrement':
        --value
        break
      default:
        return new Response('Not found', { status: 404 })
    }

    await this.state.storage.put('value', value)
    return new Response(JSON.stringify(value))
  }
}
