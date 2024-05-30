import { ClientRequest, IncomingMessage, OutgoingHttpHeaders } from 'node:http'
import { request as nodeRequest } from 'node:https'

export namespace GitHub {
  export type CreateReleaseResult = {
    upload_url: string
  }

  export type Release = {
    body: string
    draft: boolean
    name: string
    prerelease: boolean
    tag_name: string
    target_commitish: string
  }

  type Request = {
    method: 'GET' | 'POST'
    token: string
    url: URL | string
  }

  type PostRequest = {
    contentType: string
    method: 'POST'
    payload: Buffer
  } & Request

  export const createRelease = async (release: Release, repo: string, token: string) => await post(
    {
      contentType: 'application/json',
      payload: Buffer.from(JSON.stringify(release)),
      token,
      url: `https://api.github.com/repos/${repo}/releases`,
    }
  ) as CreateReleaseResult

  const injectContentHeaders = <R extends Request>(headers: OutgoingHttpHeaders, request: R) => {
    if (isPostRequest(request)) {
      headers['Content-length'] ??= request.payload.byteLength
      headers['Content-type'] ??= request.contentType
    }
  }

  const injectPayload = <R extends Request>(client: ClientRequest, request: R) => {
    if (isPostRequest(request)) {
      // TODO: Fix to let client.end() is called at a callback taken by client.write()
      client.write(request.payload)
      client.end()
    }
  }

  const isPostRequest = (value: unknown): value is PostRequest => {
    const request = value as Request
    return request.method === 'POST'
  }

  export const post = async (arg: Omit<PostRequest, 'method'>) => {
    const obj = structuredClone(arg) as PostRequest
    obj.method = 'POST'
    return await request(obj)
  }

  export const request = <R extends Request>(request: R) => new Promise<unknown>(
    resolve => {
      const url = new URL(request.url)
      const headers = {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${request.token}`,
        'User-agent': 'node:https.request',
        'X-GitHub-Api-Version': '2022-11-28',
      } as OutgoingHttpHeaders
      injectContentHeaders(headers, request)
      const client = nodeRequest(
        {
          headers,
          host: url.host,
          method: request.method,
          path: url.href,
        },
        (res: IncomingMessage) => {
          res.on(
            'close',
            () => resolve(JSON.parse(Buffer.concat(chunks).toString()))
          )
          const chunks = new Array<Buffer>()
          res.on('data', (chunk: Buffer) => chunks.push(chunk))
        }
      )
      injectPayload(client, request)
    }
  )
}
