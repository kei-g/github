import { ClientRequest, IncomingMessage, OutgoingHttpHeaders } from 'node:http'
import { request as nodeRequest } from 'node:https'

export namespace GitHub {
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
    data: Buffer
    method: 'POST'
  } & Request

  export const createRelease = async (release: Release, repo: string, token: string) => {
    const result = await post(
      {
        contentType: 'application/json',
        data: Buffer.from(JSON.stringify(release)),
        token,
        url: `https://api.github.com/repos/${repo}/releases`,
      }
    ) as Record<string, unknown> & { upload_url: string }
    return new GitHubRelease(result, token)
  }

  const injectContentHeaders = <R extends Request>(headers: OutgoingHttpHeaders, request: R) => {
    if (isPostRequest(request)) {
      headers['Content-length'] ??= request.data.byteLength
      headers['Content-type'] ??= request.contentType
    }
  }

  const injectPayload = <R extends Request>(client: ClientRequest, request: R) => {
    if (isPostRequest(request))
      client.write(request.data, client.end.bind(client))
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

class GitHubRelease {
  readonly #records: Record<string, unknown>
  readonly #token: string
  readonly #uploadURL: string

  constructor(records: Record<string, unknown> & { upload_url: string }, token: string) {
    this.#records = records
    this.#token = token
    this.#uploadURL = records.upload_url
  }

  attach(data: Buffer, name: string, contentType: string) {
    return GitHub.post(
      {
        contentType,
        data,
        token: this.#token,
        url: this.#uploadURL.replace(/\{\?name[^}]*\}/, `?name=${name}`),
      }
    )
  }

  toJSON(replacer?: undefined, space?: number) {
    return JSON.stringify(this.#records, replacer, space)
  }
}
