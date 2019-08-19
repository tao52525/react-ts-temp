const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')
const path = require('path')
const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: process.env.BUILD_ENV === 'prod' ? 'none' : 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, `../${config.outputDir}`),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new webpack.DefinePlugin(
      {
        'process.env': {
          APP_ENV: process.env.BUILD_ENV === 'prod' ? '"prod"' : '"uat"'
        }
      }
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    /* 将runtime代码放到index.html中,减少请求 */
    new ScriptExtHtmlWebpackPlugin({
      // `runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    // 删除moment多国语言包只剩下中文，如果需要其他国语言包建议最好修改正则按需引用,eg：/zh-cn|de|fr/
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // 拷贝静态文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, `../${config.outputDir}`),
        ignore: ['.*']
      }
    ])
  ],
  optimization: {
    runtimeChunk: 'single',
    namedChunks: true,
    namedModules: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        antDesign: {
          name: 'chunk-antd', // 单独将 antDesign 拆包
          priority: 20,
          test: /[\\/]node_modules[\\/]antd[\\/]/
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2, // 最小公用次数
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      // js压缩
      new TerserWebpackPlugin({
        parallel: true,
        test: /\.js(\?.*)?$/i,
        cache: true,
        sourceMap: true,
        terserOptions: {
          mangle: true,
          safari10: true
        }
      }),
      // css压缩
      new OptimizeCSSAssetsPlugin()
    ]
  }
})
