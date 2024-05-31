import { isPromise } from 'node:util/types'

export class LineHandler implements AsyncDisposable {
  readonly #callbacks = new Set<Callback>()
  readonly #chunks = [] as Buffer[]
  readonly #pending = [] as Promise<unknown>[]

  #notify(line: string) {
    for (const callback of this.#callbacks) {
      const result = callback(line)
      if (isPromise(result))
        this.#pending.push(result)
    }
  }

  #processChunks() {
    const chunk = Buffer.concat(this.#chunks.splice(0))
    for (let text = chunk.toString(); text.length;) {
      const matched = text.match(/^(?<line>[^\r\n]*)(?:\r?\n|\r(?<=[^\n]))/)
      if (matched) {
        const { line } = matched.groups ?? {}
        this.#notify(line)
        text = text.substring(matched[0].length)
      }
      else {
        this.#chunks.unshift(Buffer.from(text))
        break
      }
    }
  }

  async #waitUntilAllPendingCallbacksAreResolved() {
    await Promise.all(this.#pending.splice(0))
  }

  addCallback(callback: Callback) {
    this.#callbacks.add(callback)
  }

  feed(chunk: Buffer) {
    this.#chunks.push(chunk)
    this.#processChunks()
  }

  async flush() {
    this.#processChunks()
    await this.#waitUntilAllPendingCallbacksAreResolved()
  }

  async [Symbol.asyncDispose]() {
    this.#processChunks()
    this.#callbacks.clear()
    await this.#waitUntilAllPendingCallbacksAreResolved()
  }
}

type Callback = (line: string) => unknown
