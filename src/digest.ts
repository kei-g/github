import { BinaryToTextEncoding, createHash } from 'node:crypto'
import { StatsBase } from 'node:fs'
import { create } from '@actions/glob'
import { endGroup, getInput, group, info, setOutput, startGroup, setFailed } from '@actions/core'
import { lstat, readFile, readlink } from 'node:fs/promises'
import { sep } from 'node:path'

type Entry = {
  breadcrumb: string[]
  isDirectory?: true
  isSymbolicLink?: true
  linkTo?: string
  name: string
  path: string
  stat: StatsBase<bigint>
}

const ascendingByPath = (lhs: Entry, rhs: Entry) => lhs.path.localeCompare(rhs.path)

const convertToBuffer = async (file: Entry) => file.isSymbolicLink
  ? Buffer.from(`120000 ${file.path}\n${file.linkTo}\n`)
  : Buffer.concat(
    [
      Buffer.from(`10${file.stat.mode.toString(8)} ${file.path}\n`),
      await readFile(file.path)
    ]
  )

const convertToEntry = async (path: string) => {
  const breadcrumb = path.split(sep)
  const name = breadcrumb.pop()
  const s = await lstat(path, { bigint: true })
  const entry = {
    breadcrumb,
    name,
    path,
    stat: s,
  } as Entry
  if (s.isDirectory())
    entry.isDirectory = true
  if (s.isSymbolicLink()) {
    entry.isSymbolicLink = true
    entry.linkTo = await readlink(path)
  }
  return entry
}

const dumpEntries = (directories: Entry[], hierarchy: Record<string, Entry[]>) => {
  for (const directory of directories) {
    const { path } = directory
    info(`\u{1f4c1} \x1b[32m${path}\x1b[m`)
    if (path in hierarchy)
      for (const file of hierarchy[path]) {
        const { name } = file
        if (file.isSymbolicLink)
          info(`\t\u{1f517} \x1b[32m${name}\x1b[m -> \x1b[32m${file.linkTo} \x1b[m`)
        else {
          const mode = file.stat.mode.toString(8)
          info(`\t\u{1f4c3} \x1b[32m${name}\x1b[m \x1b[33m${mode} \x1b[m`)
        }
      }
  }
}

const getMultilineInput = (name: string) => getInput(name)?.split('\n')?.map(
  line => line.trim()
)?.filter(
  line => line.length
) ?? []

const groupBy = <T, U extends string>(iterable: Iterable<T>, selector: (value: T) => U) => {
  const obj = {} as Record<U, T[]>
  for (const value of iterable) {
    const key = selector(value)
    key in obj ? obj[key].push(value) : obj[key] = [value]
  }
  return obj
}

const main = async () => {
  startGroup('Pattern')
  const pathsIgnore = getMultilineInput('paths-ignore').map(
    pattern => `!${pattern}`
  )
  pathsIgnore.push('!.git/**')
  const pathsToHash = getMultilineInput('paths-to-hash')
  const pattern = pathsToHash.concat(pathsIgnore)
  info(JSON.stringify({ pattern }, undefined, 2))
  endGroup()

  startGroup('Glob')
  const globber = await create(pattern.join('\n'))
  const paths = await globber.glob()
  const directories = new Set<string>()
  for (const path of paths)
    directories.add(path.slice(0, path.lastIndexOf(sep)))
  info(JSON.stringify({ directories: Array.from(directories) }, undefined, 2))
  paths.push(...directories)
  endGroup()

  const flatEntries = await Promise.all(paths.map(convertToEntry))
  if (flatEntries.length === 0)
    await Promise.reject('There is no entry to be processed')

  flatEntries.sort(ascendingByPath)

  const entries = groupBy(
    flatEntries,
    entry => ['directories', 'files'][+!entry.isDirectory]
  )
  if (entries.files === undefined || entries.files.length === 0)
    await Promise.reject('There is no file to be processed')

  await group(
    'Targets',
    async () => {
      const hierarchy = groupBy(
        entries.files,
        file => file.breadcrumb.join(sep)
      )
      dumpEntries(entries.directories, hierarchy)
    }
  )

  const hash = createHash(getInput('algorithm'))
  hash.update(Buffer.concat(await Promise.all(entries.files.map(convertToBuffer))))
  const digest = hash.digest(getInput('encoding') as BinaryToTextEncoding)

  startGroup('Outputs')
  info(`digest=${digest}`)
  endGroup()

  setOutput('digest', digest)
}

main().catch((reason: unknown) => setFailed(`${reason}`))
