export const matchCache = async (request: Request): Promise<Response | null> => {
  const cache = caches.default
  const cacheResponse = await cache.match(request)

  if (cacheResponse) {
    return cacheResponse
  }

  return null
}

export const createCache = async (request: Request, response?: Response): Promise<Response> => {
  const cache = caches.default
  const cacheTarget = response ?? await fetch(request)

  const cacheResponse = genereateCacheDate(cacheTarget)
  await cache.put(request, cacheResponse)

  return cacheResponse
}

const genereateCacheDate = (response: Response): Response => {
  const expireTime = 60
  const copyResponse = response.clone()
  const cacheDate = new Response(copyResponse.body, copyResponse)
  cacheDate.headers.set("Cache-Control", `public, max-age=${expireTime}`)

  return cacheDate
}
