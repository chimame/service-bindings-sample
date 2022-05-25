import { matchCache, createCache } from './cache'

type Environment = {
  BindingsRemix: {
    fetch(request: string | Request, requestInitr?: Request | RequestInit): Promise<Response>
  }
}

type Context = {
  waitUntil(promise: Promise<any>): void
}

export default {
  async fetch(request: Request, environment: Environment, context: Context): Promise<Response> {
    const response = await matchCache(request)

    if (response) {
      return response
    }

    const remixResponse = await environment.BindingsRemix.fetch(request)
    context.waitUntil(createCache(request, remixResponse))
    return remixResponse
  },
}
