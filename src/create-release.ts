import { GitHub } from './lib/index.js'
import { endGroup, getBooleanInput, getInput, info, setFailed, setOutput, startGroup } from '@actions/core'
import { env, stderr } from 'node:process'
import { spawn } from 'node:child_process'

const createForRelease = async (ref: string): Promise<GitHub.Release> => {
  const [body, sha] = await Promise.all(
    [
      getBodyAsync(ref),
      getCommitishAsync(ref),
    ]
  )
  const version = ref.slice(11)
  const release = {
    body: getInput('body'),
    draft: getBooleanInput('draft'),
    name: getInput('release_name'),
    prerelease: getBooleanInput('prerelease'),
    tag_name: getInput('tag_name'),
    target_commitish: sha,
  } as GitHub.Release
  if (release.body.length === 0)
    release.body = body
  if (release.name.length === 0)
    release.name = `Version ${version}`
  if (release.tag_name.length === 0)
    release.tag_name = `v${version}`
  return release
}

const createRelease = async () => {
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

  const release = await createForRelease(ref)
  try {
    const response = await GitHub.createRelease(release, repo, token)

    startGroup('Outputs')
    const json = JSON.stringify(response)
    info(json)
    setOutput('response', json)
    endGroup()

    startGroup('Pretty Outputs')
    info(JSON.stringify(response, undefined, 2))
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

createRelease().catch(
  (reason: unknown) => setFailed(`${reason}`)
)
