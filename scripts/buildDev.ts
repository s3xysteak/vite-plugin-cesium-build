import * as fs from 'node:fs'
import * as path from 'node:path'
import { consola } from 'consola'

const sourceDir = './dist'
const targetDir = './demo/node_modules/vite-plugin-cesium-build/dist'

function copyFiles(sourceDir: string, targetDir: string) {
  const files = fs.readdirSync(sourceDir)

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file)
    const targetPath = path.join(targetDir, file)

    const isDirectory = fs.statSync(sourcePath).isDirectory()

    isDirectory
      ? copyFiles(sourcePath, targetPath)
      : fs.copyFileSync(sourcePath, targetPath)
  })
}

copyFiles(sourceDir, targetDir)

consola.info('dist copy successfully!')
