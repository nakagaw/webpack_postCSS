const webpack = require('webpack')
const path = require('path')

// html を別ファイルで dist
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractHTML = new HtmlWebpackPlugin({
  filename: './index.html', //出力ファイル名
  template: './template/index.ejs'
})

// css を別ファイルで dist
const ExtractTextPlugin = require('extract-text-webpack-plugin') //読み込む
const extractCSS = new ExtractTextPlugin({
  filename: './css/[name].bundle.css', //出力ファイル名:元ファイル名.bundle.css という名前になる
  disable: false,
  allChunks: true
})

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader",
            options: {
                // attrs: ["img:src", "link:href"],
                // interpolate: true,
                minimize: true,
                // removeComments: false,
                // collapseWhitespace: false
            },
          },
          {
            loader: 'ejs-html-loader',
            options: {
              title: 'Webpack init set',
              // production: process.env.ENV === 'production'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader", //CSSが抽出できないとき style-loader で head に
          use: [ //使用するloaderを指定
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2 //css-loader の前に何個 loader を import するか
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js',
                },
                // sourceMap: true
              }
            },
            {
              loader: 'stylefmt-loader',
              options: {
                config: './stylelintrc.json'
              }
            }
          ]
        })
      }
      // ,
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: extractCSS.extract({
      //     fallback: "style-loader", //CSSが抽出できないとき style-loader で head に
      //     use: [ //使用するloaderを指定
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           importLoaders: 3 //css-loader の前に何個 loader を import するか
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           config: {
      //             path: './postcss.config.js',
      //           },
      //           sourceMap: true
      //         }
      //       },
      //       {
      //         loader: 'sass-loader',
      //         options: {
      //           sourceMap: true
      //         }
      //       },
      //       {
      //         loader: 'stylefmt-loader',
      //         options: {
      //           config: './stylelintrc.json'
      //         }
      //       }
      //     ]
      //   })
      // }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), //root directly
    compress: true, //qzip
    port: 9999
  },
  devtool: 'source-map',
  plugins: [
    extractHTML,
    extractCSS
  ]
}

module.exports = config