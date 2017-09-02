const path = require('path')

const moduleExports = {}

// 项目根目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../')
// 项目业务代码根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src') 
// 项目入口文件
moduleExports.entryDir = path.resolve(moduleExports.staticRootDir, './src/index.js') 
// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './build')
// 编译生成的文件
moduleExports.bundleMain = path.resolve(moduleExports.buildDir, './main.*.js')
// puclic Dir
moduleExports.publicDir = path.resolve(moduleExports.staticRootDir, './public')
// dll Manifest文件
moduleExports.dllManifest = path.resolve(moduleExports.publicDir, './manifest.json')
// html模版文件
moduleExports.templateHtml = path.resolve(moduleExports.buildDir, './assets/template.html')


module.exports = moduleExports
