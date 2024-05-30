import { env, stderr } from 'node:process'
import { endGroup, getBooleanInput, getInput, info, setFailed, setOutput, startGroup } from '@actions/core'
import { requestAsync } from './http.js'
import { spawn } from 'node:child_process'

const createPayloadAsync = async (ref: string): Promise<string> => {
  const [body, sha] = await Promise.all(
    [
      getBodyAsync(ref),
      getCommitishAsync(ref),
    ]
  )
  const version = ref.slice(11)
  const payload = {
    body: getInput('body'),
    draft: getBooleanInput('draft'),
    name: getInput('release_name'),
    prerelease: getBooleanInput('prerelease'),
    tag_name: getInput('tag_name'),
    target_commitish: sha,
  }
  if (payload.body.length === 0)
    payload.body = body
  if (payload.name.length === 0)
    payload.name = `Version ${version}`
  if (payload.tag_name.length === 0)
    payload.tag_name = `v${version}`
  return JSON.stringify(payload, undefined, 2)
}

const createReleaseAsync = async () => {
  const token = getInput('github-token', { required: true })
  if (token.length === 0)
    await Promise.reject(`\$github-token must not be blank.`)

  const ref = getInput('ref', { required: true })
  const match = ref.match(/^refs\/tags\/v[0-9]+(\.[0-9]+)*(\-[0-9A-Za-z]+)*$/g)
  if (!match)
    await Promise.reject(`\$ref '${ref}' is not a tag.`)

  const remote = getInput('remote_name', { required: true })
  const repo = env.GITHUB_REPOSITORY as string
  const url = `https://github.com/${repo}`

  startGroup(`Fetch ${ref} from ${url} as ${remote}`)
  await executeGitCommandAsync(
    'init'
  )
  await executeGitCommandAsync(
    'remote',
    'add',
    remote,
    url
  )
  await executeGitCommandAsync(
    'fetch',
    '--depth=1',
    '--no-auto-gc',
    '--progress',
    '--prune',
    '--verbose',
    remote,
    `+${ref}:${ref}`
  )
  endGroup()

  const payload = await createPayloadAsync(ref)
  const buffer = await requestAsync(
    {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
        'User-agent': 'node:https.request',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      host: 'api.github.com',
      method: 'POST',
      path: `/repos/${repo}/releases`
    },
    Buffer.from(payload)
  )

  startGroup('Outputs')
  const response = buffer.toString()
  info(response)
  setOutput('response', response)
  endGroup()

  try {
    const data = JSON.parse(response)
    startGroup('Pretty Outputs')
    info(JSON.stringify(data, undefined, 2))
    endGroup()
  }
  catch (reason: unknown) {
    await Promise.reject(reason)
  }
}

const executeGitCommandAsync = (...options: string[]) => new Promise<string>(
  (resolve: (value: string) => void) => {
    const git = spawn('git', options)
    git.stderr.pipe(stderr)
    git.stdout.on(
      'close',
      () => resolve(Buffer.concat(chunks).toString())
    )
    const chunks = new Array<Buffer>()
    git.stdout.on('data', (chunk: Buffer) => chunks.push(chunk))
  }
)

const getBodyAsync = async (ref: string) => {
  const contents = await executeGitCommandAsync(
    'for-each-ref',
    '--format=%(contents)',
    ref
  )
  const i = contents.search(/(?<=\n\s*)Signed\-off\-by\:\s+/g)
  const j = contents.search(/(?<=\n\s*)\-{5}BEGIN\ PGP\ SIGNATURE\-{5}\n{2}/g)
  return i < 0 ? j < 0 ? contents : contents.slice(0, j) : contents.slice(0, i)
}

const getCommitishAsync = (ref: string) => executeGitCommandAsync(
  '--no-pager',
  'log',
  '--pretty=format:%H',
  '-1',
  ref
)

createReleaseAsync().catch(
  (reason: unknown) => setFailed(`${reason}`)
)
