import { Git, GitHub } from './lib/index.js'
import { endGroup, getBooleanInput, getInput, info, setFailed, setOutput, startGroup, warning } from '@actions/core'
import { env } from 'node:process'

const createForRelease = async (ref: string): Promise<GitHub.Release> => {
  const refName = env.GITHUB_REF_NAME as string
  const [version] = refName.match(/\d+(\.\d+)*/) ?? [refName]
  const release = {
    body: getInput('body'),
    draft: getBooleanInput('draft'),
    name: getInput('release_name'),
    prerelease: getBooleanInput('prerelease'),
    tag_name: getInput('tag_name'),
    target_commitish: env.GITHUB_SHA,
  } as GitHub.Release
  if (release.body.length === 0)
    release.body = await new Git().messageBodyOf(ref as string)
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

  const git = new Git()
  git.on('error', (chunk: Buffer) => warning(chunk.toString()))

  {
    startGroup('git init')
    info(await git.init())
    endGroup()
  }

  {
    startGroup(`git remote add ${url} as ${remote}`)
    info(await git.addRemote(remote, url))
    endGroup()
  }

  {
    startGroup(`Fetch ${ref} from ${url} as ${remote}`)
    info(await git.fetch(ref, remote, { depth: 1, noAutoGc: true, progress: true, prune: true, verbose: true }))
    endGroup()
  }

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

createRelease().catch(
  (reason: unknown) => setFailed(`${reason}`)
)
