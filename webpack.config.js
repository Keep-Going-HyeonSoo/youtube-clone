const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// __dirname : /workspace/youtube-clone
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js')
const OUTPUT_DIR = path.join(__dirname, 'static')
const MODE = process.env.WEBPACK_ENV // npm scripts 에서 분기처리

const config = {
  mode: MODE,
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js' // entry 파일의 파일명이 그대로 설정된다.
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/, // .scss 나 .sass 에 대한 정규표현식
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer']
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devtool: 'cheap-module-source-map'
}

module.exports = config
