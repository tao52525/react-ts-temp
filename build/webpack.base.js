const path = require('path')
const rootPath = path.join(__dirname, '..')
const config = require('./config')
const os = require('os')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: path.join(rootPath, 'src', 'index.tsx'),
  output: {
    filename: '[name].js',
    path: path.join(rootPath, config.outputDir)
  },
  resolve: {
    extensions: config.extensions,
    alias: config.alias
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryDirectory: 'es',
              libraryName: 'antd',
              style: true
            })
          ]
        })
      },
      exclude: /node_modules/
    },
    /* config.module.rule('images') */
    {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [
        /* config.module.rule('images').use('url-loader') */
        {
          loader: 'url-loader',
          options: {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  plugins: [
  ]
}
