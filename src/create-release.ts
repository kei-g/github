import { Git, GitHub } from './lib/index.js'
import { endGroup, getBooleanInput, getInput, getMultilineInput, info, setFailed, setOutput, startGroup, warning } from '@actions/core'
import { env } from 'node:process'
import { readFile } from 'node:fs/promises'
import { sep } from 'node:path'

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
  const user = env.GITHUB_TRIGGERING_ACTOR as string
  const url = `https://${user}:${token}@github.com/${repo}`
  const visibleURL = url.replace(/^([^:]+:\/\/)[^:]+[^@]+@(.+)$/, '$1$2')

  const git = new Git()
  git.on('error', (chunk: Buffer) => warning(chunk.toString()))

  {
    startGroup('git init')
    info(await git.init())
    endGroup()
  }

  {
    startGroup(`git remote add ${visibleURL} as ${remote}`)
    info(await git.addRemote(remote, url))
    endGroup()
  }

  {
    startGroup(`Fetch ${ref} from ${visibleURL} as ${remote}`)
    info(await git.fetch(ref, remote, { depth: 1, noAutoGc: true, progress: true, prune: true, verbose: true }))
    endGroup()
  }

  try {
    const release = await GitHub.createRelease(await createForRelease(ref), repo, token)

    startGroup('Outputs')
    const json = release.toJSON()
    info(json)
    setOutput('response', json)
    endGroup()

    startGroup('Pretty Outputs')
    info(release.toJSON(undefined, 2))
    endGroup()

    const assets = getMultilineInput('assets')
    if (assets.length) {
      const name = env.GITHUB_REF_NAME as string
      const sha = env.GITHUB_SHA as string
      startGroup(`Checkout ${sha} as a branch, ${name}`)
      info(await git.checkout(name, sha))
      endGroup()
    }

    for (const asset of assets) {
      const matched = asset.match(/\s+as\s+(?<contentType>[+/.a-z-]+)$/)
      const path = asset.substring(0, matched?.index)
      const contentType = matched?.groups?.contentType ?? 'application/octet-stream'
      startGroup(`Attaching asset ${path} as ${contentType}`)
      const name = path.split(sep).at(-1) as string
      const data = await readFile(path)
      const result = await release.attach(data, name, contentType)
      info(JSON.stringify(result, undefined, 2))
      endGroup()
    }
  }
  catch (reason: unknown) {
    await Promise.reject(reason)
  }
}

createRelease().catch(
  (reason: unknown) => setFailed(`${reason}`)
)
