const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const portfinder = require('portfinder')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const config = require('./config')

const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: config.port,
    open: false,
    overlay: { warnings: false, errors: true },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: config.theme,
              javascriptEnabled: true
            }
          }
        ],
        include: /node_modules/
      }
    ]
  },
  plugins: [
    /* config.plugin('define') */
    new webpack.DefinePlugin(
      {
        'process.env': {
          APP_ENV: '"local"'
        }
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    })
  ]
})
// module.exports = devWebpackConfig
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:${port}`
            ]
          },
          onErrors: undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
