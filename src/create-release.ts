import { Git, GitHub, LineHandler } from './lib/index.js'
import { chdir, env } from 'node:process'
import { endGroup, getBooleanInput, getInput, getMultilineInput, group, info, setFailed, setOutput, startGroup } from '@actions/core'
import { join as joinPath, sep } from 'node:path'
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'

const attachAssets = async (git: Git, lineHandler: LineHandler, release: GitHub.ReleaseInterface) => {
  const assets = getMultilineInput('assets')
  if (assets.length) {
    const name = env.GITHUB_REF_NAME as string
    const sha = env.GITHUB_SHA as string
    await group(
      `Checkout ${sha} as a branch, ${name}`,
      async () => {
        info(await git.checkout(name, sha))
        await lineHandler.flush()
      }
    )
  }
  for (const asset of assets) {
    const matched = asset.match(/\s+as\s+(?<contentType>[+/.a-z-]+)$/)
    const path = asset.substring(0, matched?.index)
    const contentType = matched?.groups?.contentType ?? 'application/octet-stream'
    await group(
      `Attaching asset ${path} as ${contentType}`,
      async () => {
        const name = path.split(sep).at(-1) as string
        const data = await readFile(path)
        const response = await release.attach(data, name, contentType)
        info(JSON.stringify({ response }, undefined, 2))
        await lineHandler.flush()
      }
    )
  }
}

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
  const sha = env.GITHUB_SHA as string
  const user = env.GITHUB_TRIGGERING_ACTOR as string
  const url = `https://${user}:${token}@github.com/${repo}`
  const visibleURL = url.replace(/^([^:]+:\/\/)[^:]+[^@]+@(.+)$/, '$1$2')
  const repositoryName = repo.replace(/^[^/]+\//, '')

  startGroup('Making temporary directory')
  const tempDir = await mkdtemp(joinPath(tmpdir(), `${repositoryName}-${sha}-`))
  info(`Temporary directory is created at ${tempDir}`)
  chdir(tempDir)
  endGroup()

  const git = new Git()
  await using lineHandler = new LineHandler()
  lineHandler.addCallback(warning)
  git.on('error', lineHandler.feed.bind(lineHandler))

  await group(
    'git init',
    async () => {
      info(await git.init())
      await lineHandler.flush()
    }
  )

  await group(
    `git remote add ${visibleURL} as ${remote}`,
    async () => {
      info(await git.addRemote(remote, url))
      await lineHandler.flush()
    }
  )
  await group(
    `Fetch ${ref} from ${visibleURL} as ${remote}`,
    async () => {
      info(await git.fetch(ref, remote, { depth: 1, noAutoGc: true, progress: true, prune: true, verbose: true }))
      await lineHandler.flush()
    }
  )

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

    await attachAssets(git, lineHandler, release)
  }
  catch (reason: unknown) {
    await Promise.reject(reason)
  }
}

const warning = (text: string) => info(`\x1b[33m${text}\x1b[m`)

createRelease().catch(
  (reason: unknown) => setFailed(`${reason}`)
)
