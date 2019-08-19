const webpack = require('webpack')
const webpackProdConfig = require('./webpack.prod.js')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const config = require('./config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// analyzer
if (process.env.npm_config_report === 'true') {
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

const spinner = ora(
  'building for prod environment...'
)
spinner.start()

rm(path.resolve(__dirname, `../${config.outputDir}`), err => {
  if (err) throw err

  webpack(webpackProdConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red(' Build failed with errors.\n'))
      process.exit(1)
    }
  })
})
