// playground
import { execSync } from 'node:child_process'
import * as process from 'node:process'

import { pipe } from '@s3xysteak/utils'

// * mode
const MODE_LIST = new Set([
  'dev',
  'preview',
] as const)
type Mode = typeof MODE_LIST extends Set<infer T> ? T : never

// * params
function params() {
  const [_0, _1, mode, path, ...args] = process.argv
  if (!MODE_LIST.has(mode as any))
    throw new Error('unexpected mode')

  return {
    mode: mode as Mode,
    path,
    args: new Set(args),
  }
}

const { mode, path, args } = params()

const modeMap: Record<Mode, string> = {
  dev: `pnpm --filter=${path} dev`,
  preview: `pnpm --filter=${path} build && pnpm --filter=${path} preview`,
}

// * options
const createCommand = pipe(
  // --skip
  (v: string) => {
    const prepare = `pnpm build && pnpm --filter=${path} i &&`
    const isSkip = args.has('--skip')

    return isSkip ? v : `${prepare} ${v}`
  },
)

execSync(createCommand(modeMap[mode]), { stdio: 'inherit' })
