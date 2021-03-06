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
    // publicPath: "../",
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
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
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?name=[path][name].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              }
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
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader", //CSSが抽出できないとき style-loader で head に
          publicPath: "../", //background-imageを相対パスにするため
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
      //     publicPath: "../", //background-imageを相対パスにするため
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
    contentBase: path.join(__dirname, 'dist'), //root directly
    compress: true, //qzip
    port: 9999
  },
  devtool: 'source-map',
  plugins: [
    extractHTML,
    extractCSS
  ],
  // resolve: {
  //   extensions: ['*', '.js', '.css', '.scss'],
  //   alias: {
  //     'sanitize': path.join(__dirname, '/node_modules/sanitize.css/sanitize.css') //postcss-partial-importと相性悪し
  //   }
  // }
}

module.exports = config