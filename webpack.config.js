const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// __dirname : /workspace/youtube-clone
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js')
const OUTPUT_DIR = path.join(__dirname, 'static')
const MODE = process.env.WEBPACK_ENV // npm scripts 에서 분기처리

const config = {
  mode: MODE,
  entry: ['core-js/stable', ENTRY_FILE],
  output: {
    path: OUTPUT_DIR,
    filename: '[name].js' // entry 파일의 파일명이 그대로 설정된다.
  },
  target: ['es5'],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [[
                '@babel/env', {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: {
                    browsers: ['last 3 versions', 'ie >= 11'],
                    node: 'current'
                  }
                }
              ]]
            }
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
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['static']
    })
  ],
  devtool: 'cheap-module-source-map'
}

module.exports = config
