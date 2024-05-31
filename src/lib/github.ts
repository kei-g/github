import { IncomingMessage } from 'node:http'
import { request as nodeRequest } from 'node:https'

export class GitHub {
  readonly #token: string

  #post<T extends Record<string, unknown>>(data: Buffer, url: URL, contentType: string) {
    return new Promise<T>(
      resolve => {
        const client = nodeRequest(
          {
            headers: {
              'accept': 'application/vnd.github+json',
              'authorization': `Bearer ${this.#token}`,
              'content-length': data.byteLength,
              'content-type': contentType,
              'user-agent': 'node:https.request',
              'x-github-api-version': '2022-11-28',
            },
            hostname: url.hostname,
            method: 'POST',
            path: `${url.pathname}${url.search}`,
            port: url.port,
            protocol: url.protocol,
          },
          (response: IncomingMessage) => {
            response.on(
              'close',
              () => resolve(JSON.parse(Buffer.concat(chunks).toString()))
            )
            const chunks = [] as Buffer[]
            response.on('data', chunks.push.bind(chunks))
          }
        )
        client.write(data, client.end.bind(client))
      }
    )
  }

  constructor(opts: GitHub.ConstructorOptions) {
    this.#token = opts.token
  }

  async createRelease(repo: string, opts: GitHub.ReleaseOptions) {
    const data = Buffer.from(JSON.stringify(opts))
    const url = new URL(`https://api.github.com/repos/${repo}/releases`)
    const response = await this.#post<{ upload_url: string }>(data, url, 'application/json')
    return new GitHubRelease(this.#post.bind(this), response, response.upload_url)
  }
}

export namespace GitHub {
  export type ConstructorOptions = {
    token: string
  }

  export interface Release {
    attach(data: Buffer, name: string, contentType: string): Promise<unknown>
    toJSON(replacer?: undefined, space?: number): string
  }

  export type ReleaseOptions = {
    body: string
    draft: boolean
    name: string
    prerelease: boolean
    tag_name: string
    target_commitish: string
  }
}

class GitHubRelease implements GitHub.Release {
  readonly #post: (data: Buffer, url: URL, contentType: string) => Promise<Record<string, unknown>>
  readonly #records: Record<string, unknown>
  readonly #uploadURL: string

  constructor(post: (data: Buffer, url: URL, contentType: string) => Promise<Record<string, unknown>>, records: Record<string, unknown>, uploadURL: string) {
    this.#post = post
    this.#records = records
    this.#uploadURL = uploadURL
  }

  attach(data: Buffer, name: string, contentType: string) {
    return this.#post(data, new URL(this.#uploadURL.replace(/\{\?name[^}]*\}/, `?name=${name}`)), contentType)
  }

  toJSON(replacer?: undefined, space?: number) {
    return JSON.stringify(this.#records, replacer, space)
  }
}
