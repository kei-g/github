import { ClientRequestArgs, IncomingMessage } from 'node:http'
import { request } from 'node:https'

export const requestAsync = (args: ClientRequestArgs, payload: Buffer) => new Promise<Buffer>(
  resolve => {
    const req = request(
      args,
      (res: IncomingMessage) => {
        res.on('close', () => resolve(Buffer.concat(chunks)))
        const chunks = new Array<Buffer>()
        res.on('data', (chunk: Buffer) => chunks.push(chunk))
      }
    )
    req.write(payload)
    req.end()
  }
)
