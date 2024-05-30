import { ClientRequestArgs, IncomingMessage } from 'node:http'
import { request as nodeRequest } from 'node:https'

export namespace GitHub {
  export const request = (args: ClientRequestArgs, payload: Buffer) => new Promise<Buffer>(
    resolve => {
      const req = nodeRequest(
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
}
