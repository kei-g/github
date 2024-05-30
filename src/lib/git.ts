import { spawn } from 'node:child_process'

export class Git {
  readonly #listeners = new Set<Listener>()

  #notify(chunk: Buffer) {
    this.#listeners.forEach(listener => listener(chunk))
  }

  addRemote(name: string, url: string) {
    return this.execute('remote', 'add', name, url)
  }

  async execute(command: string, ...args: string[]) {
    const git = spawn('git', [command].concat(...args))
    const [_stderr, stdout] = await Promise.all(
      [
        new Promise<void>(
          resolve => {
            git.stderr.on('close', resolve)
            git.stderr.on('data', this.#notify.bind(this))
          }
        ),
        new Promise<string>(
          resolve => {
            const chunks = [] as Buffer[]
            git.stdout.on('close', () => resolve(Buffer.concat(chunks).toString()))
            git.stdout.on('data', chunks.push.bind(chunks))
          }
        ),
      ]
    )
    return stdout
  }

  fetch(ref: string, remote: string, options?: FetchOptions) {
    const args = []
    if (isNaturalNumber(options?.depth))
      args.push(`--depth=${options?.depth}`)
    delete options?.depth
    for (const key in options ?? {})
      args.push(`--${hyphenate(key)}`)
    args.push(remote)
    args.push(`+${ref}:${ref}`)
    return this.execute('fetch', ...args)
  }

  init() {
    return this.execute('init')
  }

  async messageBodyOf(ref: string) {
    const contents = await this.execute(
      'for-each-ref',
      '--format=%(contents)',
      ref
    )
    const i = contents.search(/(?<=\n\s*)Signed\-off\-by\:\s+/g)
    const j = contents.search(/(?<=\n\s*)\-{5}BEGIN\ PGP\ SIGNATURE\-{5}\n{2}/g)
    return i < 0 ? j < 0 ? contents : contents.slice(0, j) : contents.slice(0, i)
  }

  on(_eventName: 'error', listener: Listener) {
    this.#listeners.add(listener)
  }
}

type FetchOptions = {
  depth?: number
  noAutoGc?: true
  progress?: true
  prune?: true
  verbose?: true
}

type Listener = (chunk: Buffer) => void

const camelCaseRE = /(?<=[a-z\d])[A-Z][^A-Z]*/g

const hyphenate = (camelCaseText: string) => camelCaseText.replaceAll(camelCaseRE, (value: string) => `-${value.toLowerCase()}`)

const isNaturalNumber = (value?: number) => Number.isInteger(value) && 0 < (value ?? 0)
