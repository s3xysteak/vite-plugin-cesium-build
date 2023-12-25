import * as fs from 'node:fs'
import * as path from 'node:path'

const sourceDir = './dist'
const targetDir = './demo/node_modules/vite-plugin-cesium-build/dist'

const copyFiles = (sourceDir, targetDir) => {
  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file)
    const targetPath = path.join(targetDir, file)

    const isDirectory = fs.statSync(sourcePath).isDirectory()

    isDirectory
      ? copyFiles(sourcePath, targetPath)
      : fs.copyFileSync(sourcePath, targetPath)
  })
}

copyFiles(sourceDir, targetDir)

console.log('\x1B[34m%s\x1B[39m', '\u2714 dist copy successfully!')
