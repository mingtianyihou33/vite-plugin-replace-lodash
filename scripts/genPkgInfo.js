import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
// 获取当前模块的目录路径
const __dirname = path.dirname(__filename)

const files = ['README.md', 'CHANGELOG.md', 'src/types', 'LICENSE']
const targetDir = path.join(__dirname, '../dist')
const rootDir = path.join(__dirname, '..')
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'),
)

async function copyFile(filename) {
  const inputPath = path.resolve(rootDir, filename)
  if (!fs.existsSync(inputPath)) return
  if (fs.statSync(inputPath).isDirectory()) {
    if (!fs.existsSync(path.resolve(targetDir, filename))) {
      fs.mkdirSync(path.resolve(targetDir, filename), { recursive: true })
    }
    const files = fs.readdirSync(inputPath)
    files.forEach(file => {
      copyFile(path.join(filename, file))
    })
    return
  }
  fs.copyFileSync(
    path.resolve(rootDir, filename),
    path.resolve(targetDir, filename),
  )
}

function generatePkgJson() {
  const data = {
    name: pkg.name,
    version: pkg.version,
    author: pkg.author,
    description: pkg.description,
    repository: pkg.repository,
    keywords: pkg.keywords,
    type: 'module',
    main: './index.cjs',
    module: './index.mjs',
    types: './index.d.ts',
    exports: {
      '.': {
        import: './index.mjs',
        require: './index.cjs',
      },
    },
  }
  if (pkg.dependencies) {
    data.dependencies = pkg.dependencies
  }
  if (pkg.peerDependencies) {
    data.peerDependencies = pkg.peerDependencies
  }
  files.map(filename => copyFile(filename))
  fs.writeFileSync(
    path.resolve(targetDir, 'package.json'),
    JSON.stringify(data, null, 2),
    {
      encoding: 'utf-8',
    },
  )
}

generatePkgJson()
