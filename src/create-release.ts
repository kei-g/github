import { Git, GitHub, LineHandler } from './lib/index.js'
import { chdir, cwd, env } from 'node:process'
import { endGroup, getBooleanInput, getInput, getMultilineInput, getState, group, info, saveState, setFailed, setOutput, startGroup } from '@actions/core'
import { readFile, rm } from 'node:fs/promises'
import { sep } from 'node:path'

const attachAssets = async (git: Git, lineHandler: LineHandler, release: GitHub.Release) => {
  const assets = getMultilineInput('assets')
  const score = +assets.length * 2 + +getBooleanInput('checkout')
  const execute = [checkout.bind(this)][+!(score === 3)]
  const home = await execute?.(git, lineHandler)
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
  if (home)
    chdir(home)
}

const checkout = async (git: Git, lineHandler: LineHandler) => {
  const name = env.GITHUB_REF_NAME as string
  const sha = env.GITHUB_SHA as string
  for (const [_name, repo] of git.repositories) {
    const home = cwd()
    chdir(repo)
    await group(
      `Checkout ${sha} as a branch, ${name}`,
      async () => {
        info(await git.checkout(name, sha))
        await lineHandler.flush()
      }
    )
    return home
  }
}

const createReleaseOptions = async (provideMessageBody: () => Promise<string>): Promise<GitHub.ReleaseOptions> => {
  const release = {
    body: getInput('body'),
    draft: getBooleanInput('draft'),
    name: getInput('release_name'),
    prerelease: getBooleanInput('prerelease'),
    tag_name: getInput('tag_name'),
    target_commitish: env.GITHUB_SHA,
  } as GitHub.ReleaseOptions
  if (release.body.length === 0)
    release.body = await provideMessageBody()
  const name = env.GITHUB_REF_NAME as string
  const [version] = name.match(/\d+(\.\d+)*/) ?? [name]
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

  const repo = env.GITHUB_REPOSITORY as string

  using git = new Git()
  await using lineHandler = new LineHandler()
  lineHandler.addCallback(warning)
  git.on('error', lineHandler.feed.bind(lineHandler))

  const github = new GitHub({ token })
  const release = await github.createRelease(
    repo,
    await createReleaseOptions(getMessageBody.bind(this, git, lineHandler, ref, repo, token))
  )

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

const getMessageBody = async (git: Git, lineHandler: LineHandler, ref: string, repo: string, token: string) => {
  const user = env.GITHUB_TRIGGERING_ACTOR as string
  const url = `https://${user}:${token}@github.com/${repo}`
  const remote = getInput('remote_name', { required: true })
  const visibleURL = url.replace(/^([^:]+:\/\/)[^:]+[^@]+@(.+)$/, '$1$2')
  await group(
    'Making temporary directory',
    async () => {
      const name = repo.replace(/^[^/]+\//, '')
      const sha = env.GITHUB_SHA as string
      const tempDir = await git.enterToRepository(repo, `${name}-${sha}-`)
      info(`Temporary directory is created at ${tempDir}`)
    }
  )
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
  const body = await git.messageBodyOf(ref)
  git.leaveRepository()
  return body
}

const warning = (text: string) => info(`\x1b[33m${text}\x1b[m`)

const state = getState('repositories')
const repositories = [JSON.parse.bind(this, state)][+!state.length]?.() ?? {}
saveState('repositories', undefined)

await createRelease().catch(
  (reason: unknown) => setFailed(`${reason}`)
)

for (const [name, path] of Object.entries(repositories))
  await group(
    `Remove repository, ${name}`,
    async () => {
      info(`rm -fr ${path}`)
      await rm(path as string, { force: true, recursive: true }).catch(
        error => warning(error.message)
      )
    }
  )
