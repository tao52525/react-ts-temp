const path = require('path')

module.exports = {
  port: '9000',
  title: 'demo',
  outputDir: 'dist',
  alias: {
    '@config': path.join(__dirname, 'config.js'),
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, '..', 'src/tools/icons.ts')
  },
  extensions: ['.ts','.tsx','.js', '.jsx', '.json'],
  // antd主题定制
  theme: {}
}
